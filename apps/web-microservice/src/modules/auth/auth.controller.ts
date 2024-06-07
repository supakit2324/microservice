import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '../auth/dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersLoginEntity } from './entities/user-login-entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Post('login')
  @UseGuards(LoginAuthGuard)
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 200,
    type: UsersLoginEntity,
  })
  async loginUser(
    @Body() body: LoginUserDto,
  ) {
    const { email, password } = body;
    try {
      const auth = await this.authService.loginUser(email, password);
      return auth;
    } catch (e) {
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
