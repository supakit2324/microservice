import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { BooksModule } from '../books/books.module';
import { BooksStockModule } from '../books-stock/books-stock.module';
import { OrdersModule } from '../orders/orders.module';
import { LoginModule } from '../login/login.module';
import configuration from 'apps/config/configuration';
import { throttlerAsyncOptions, throttlerServiceProvider } from '../../throttler.providers';
import { APP_GUARD } from '@nestjs/core';
import { redisStore } from "cache-manager-redis-store";
import { RedisClientOptions } from 'redis';
import RegisterCacheOptions, { cachingServiceProvider } from '../../cache.providers';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.registerAsync(RegisterCacheOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    AuthModule,
    UsersModule,
    BooksModule,
    BooksStockModule,
    OrdersModule,
    LoginModule,
  ],
  providers: [
    cachingServiceProvider,
    throttlerServiceProvider
  ],
})
export class AppModule { }
