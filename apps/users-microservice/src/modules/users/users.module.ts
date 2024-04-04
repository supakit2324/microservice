import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersMicroserviec } from './users.microservice';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { model } from '../models/model';
import { DB_CONNECTION_NAME } from '../../constants';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature(model, DB_CONNECTION_NAME),
    CacheModule.register(),
  ],
  controllers: [UsersMicroserviec],
  providers: [UsersService, ConfigService, JwtService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
