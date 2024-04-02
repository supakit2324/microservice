import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginMicroservice } from './login.microservice';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DB_CONNECTION_NAME } from '../../constants';
import { model } from '../models/model';

@Module({
  imports: [MongooseModule.forFeature(model, DB_CONNECTION_NAME)],
  controllers: [LoginMicroservice],
  providers: [
    LoginService,
    UsersService,
    JwtService
  ],
})
export class LoginModule {}
