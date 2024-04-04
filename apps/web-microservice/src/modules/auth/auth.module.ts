import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {
  MakeRMQServiceProvider,
  MakeUserTCPServiceProvider,
} from '@Libs/common/index';
import { RMQService, TCPService } from '../../constants';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS),
      MakeUserTCPServiceProvider(TCPService.USERS),
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
