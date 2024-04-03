import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserEntity } from './entities/users.entity';
import { UsersInterface } from './interfaces/users.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordUserValidationPipe } from './pipes/change-password-user-validation.pipe';
import { ChangePasswordEntity } from './entities/change-password.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserEntity } from './entities/update-user.entity';
import { RolesUserEnum } from './enum/roles-user.enum';
import { UpdateRolesDTO } from './dto/update-role.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import UsersQueryEntity from './entities/users-query.entity';
import { JwtRoleGuard } from '../auth/guards/jwt-role.guard';
import { ReportUserEntity } from './entities/report-users.entity';
import { UseRoles } from 'apps/decorators/role.decorator';
import ReqUser from 'apps/decorators/req-user.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('users')
@ApiTags('user')
@UseInterceptors(CacheInterceptor)
@CacheTTL(6000)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  async getMe(@ReqUser() user: UsersInterface): Promise<UserEntity> {
    return user;
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UpdateUserEntity,
  })
  async updateUser(
    @ReqUser() user: UsersInterface,
    @Body() update: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.usersService.updateUser(user.userId, update);
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ChangePasswordEntity,
  })
  async changePassword(
    @ReqUser() user: UsersInterface,
    @Body(ChangePasswordUserValidationPipe) body: ChangePasswordDto,
  ): Promise<void> {
    try {
      await this.usersService.changePasswordUser(
        user.userId,
        body.hashPassword,
      );
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Put('update-role/:userId')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiBody({
    type: UpdateRolesDTO,
  })
  async updateRole(
    @Payload() update: { userId: string; roles: string },
  ): Promise<void> {
    try {
      await this.usersService.updateRole(update);
    } catch (e) {
      this.logger.error(
        `catch on update-role: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Put(':userId/banned')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async banUser(@Param('userId') userId: string): Promise<void> {
    try {
      const user = await this.usersService.banUser(userId);
      if (!user) {
        throw new BadRequestException('User Id Not found');
      }

      return;
    } catch (e) {
      this.logger.error(
        `catch on ban-user: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Put(':userId/unbanned')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async unBanUser(@Param('userId') userId: string): Promise<void> {
    try {
      const user = await this.usersService.unBanUser(userId);
      if (!user) {
        throw new BadRequestException('User Id Not found');
      }
      return;
    } catch (e) {
      this.logger.error(
        `catch on un-ban-user: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UsersQueryEntity,
  })
  async getPagination(
    @Query() query: UsersQueryDto,
  ): Promise<UsersQueryEntity> {
    const { username, firstname, lastname } = query;
    const filter = {};

    if (username) {
      filter['username'] = { $regex: `^${username}`, $options: 'i' };
    } else if (firstname) {
      filter['firstname'] = { $regex: `^${firstname}`, $options: 'i' };
    } else if (lastname) {
      filter['lastname'] = { $regex: `^${lastname}`, $options: 'i' };
    }

    query.filter = filter;
    try {
      return this.usersService.getPagination(query);
    } catch (e) {
      this.logger.error(
        `catch on pagination: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Get('report-new-user')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReportUserEntity,
  })
  @ApiBearerAuth()
  async reportNewUser(): Promise<UsersInterface> {
    try {
      const newUsers = await this.usersService.findNewUser();
      if (!Array.isArray(newUsers) || newUsers.length === 0) {
        throw new BadRequestException('No new users found');
      }
      return newUsers;
    } catch (e) {
      this.logger.error(
        `catch on report-new-user: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
