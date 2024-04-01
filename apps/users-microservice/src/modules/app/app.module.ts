import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { LoginModule } from '../login/login.module';
import configuration from 'apps/config/configuration';
import { mongooseModuleAsyncOptions } from '../../mongoose.providers';
import { throttlerAsyncOptions, throttlerServiceProvider } from '../../throttler.providers';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    UsersModule,
    AuthModule,
    LoginModule,
  ],
  providers: [throttlerServiceProvider],
})
export class AppModule {}
