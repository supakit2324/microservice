import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { BooksModule } from '../books/books.module';
import { BooksStockModule } from '../books-stock/books-stock.module';
import { OrdersModule } from '../orders/orders.module';
import {
  throttlerAsyncOptions,
  throttlerServiceProvider,
} from '@Libs/common/index';
import configuration from '../../config/configuration';
import {
  RegisterCacheOptions,
  cachingServiceProvider,
} from '@Libs/common/index';

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
  ],
  providers: [cachingServiceProvider, throttlerServiceProvider],
})
export class AppModule {}
