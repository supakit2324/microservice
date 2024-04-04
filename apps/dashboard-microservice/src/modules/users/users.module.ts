import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controllor';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider, MakeUserTCPServiceProvider } from "@Libs/common/index"
import { RMQService, TCPService } from '../../constants';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ThrottlerModule.forRoot(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS),
      MakeUserTCPServiceProvider(TCPService.USERS)
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService, AuthService, JwtStrategy],
})
export class UsersModule {}
