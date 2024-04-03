import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '../auth/dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { SkipThrottle } from '@nestjs/throttler';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersLoginEntity } from './entities/user-login-entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @SkipThrottle({ value: true })
  @UseGuards(LoginAuthGuard)
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UsersLoginEntity,
  })
  async loginUser(@Body() body: LoginUserDto) {
    const { email, password } = body;
    try {
      return await this.authService.loginUser(email, password);
    } catch (e) {
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
