import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { userEntity } from './entities/user.entity';
import { UsersInterface } from './interfaces/users.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordUserValidationPipe } from './pipes/change-password-user-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { registerUserValidationPipe } from './pipes/register-user-validation.pipe';
import { JwtRoleGuard } from '../auth/guards/jwt-role.guard';
import { RolesUserEnum } from '@Libs/common/index';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UseRoles, ReqUser } from '@Libs/common/index';

@Controller('users')
@ApiTags('user')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserDto,
  })
  async createUser(
    @Body(registerUserValidationPipe) body: CreateUserDto,
  ): Promise<void> {
    try {
      await this.usersService.registerUser(body);
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseRoles(RolesUserEnum.MEMBER, RolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  async getMe(@ReqUser() user: UsersInterface): Promise<userEntity> {
    return user;
  }

  @Put('update')
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiBearerAuth()
  @UseRoles(RolesUserEnum.MEMBER, RolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @ApiResponse({
    status: 200,
    type: UpdateUserDto,
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
  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiBearerAuth()
  @UseRoles(RolesUserEnum.MEMBER, RolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @ApiResponse({
    status: 200,
    type: ChangePasswordDto,
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
}
