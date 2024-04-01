import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controllor';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import RegisterCacheOptions from '../../cache.providers';
import { MakeRMQServiceProvider } from '../../microservice.providers';
import { RMQService } from '../../constants';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RegisterCacheOptions),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS),
      MakeRMQServiceProvider(RMQService.BOOKS)
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService, AuthService, JwtStrategy],
})
export class UsersModule {}
