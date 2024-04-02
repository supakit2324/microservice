import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from '../login/login.service';
import { ConfigModule } from '@nestjs/config';
import RegisterCacheOptions from '../../cache.providers';
import { MakeRMQServiceProvider, MakeUserTCPServiceProvider } from '../../microservice.providers';
import { RMQService, TCPService } from '../../constants';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RegisterCacheOptions),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS),
      MakeUserTCPServiceProvider(TCPService.USERS)
    ]),
  ],
  controllers: [AuthController],
  providers: [ 
    AuthService,
    JwtStrategy,
    LoginService
  ],
  exports: [
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
