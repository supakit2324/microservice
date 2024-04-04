import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AmountLoginDTO } from './dto/login.dto';
import { CalendarDTO } from './dto/calendar.dto';
import { JwtRoleGuard } from '../auth/guards/jwt-role.guard';
import { RolesUserEnum } from '@Libs/common/index';
import { UserLastLoginResponseEntity } from './entities/user-last-login-respones.entity';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UseRoles } from '@Libs/common/index';

@Controller('report-users')
@ApiTags('report-users')
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@CacheTTL(6000)
export class LogginController {
  private readonly logger = new Logger(LogginController.name);
  constructor(private readonly loginService: LoginService) {}

  @Get('users-login')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiResponse({
    type: AmountLoginDTO,
    status: 200,
    description: 'Success',
  })
  async getAmountUsersLogin(@Query() query: CalendarDTO): Promise<CalendarDTO> {
    const { date } = query;

    try {
      const day = await this.loginService.getAmountUsersLogin(query);
      if (day === null) {
        throw new NotFoundException(`Day ${date} not found`);
      }
      return day;
    } catch (e) {
      this.logger.error(
        `catch on amount-users-login: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Get('last-users-login')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @UseRoles(RolesUserEnum.ADMIN)
  @ApiResponse({
    type: UserLastLoginResponseEntity,
    status: 200,
    description: 'Success',
  })
  async getLastUserlogin(@Query() query: CalendarDTO): Promise<CalendarDTO> {
    try {
      const lastLogin = await this.loginService.getLastUsersLogin(query);
      return lastLogin;
    } catch (e) {
      this.logger.error(
        `catch on last-users-login: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
