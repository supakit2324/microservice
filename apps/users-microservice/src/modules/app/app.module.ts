import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { LoginModule } from '../login/login.module';
import { mongooseModuleAsyncOptions } from "@Libs/common/index"
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    UsersModule,
    AuthModule,
    LoginModule,
  ],
})
export class AppModule {}
