import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BooksStockService } from '../books-stock/books-stock.service';
import { BooksService } from '../books/books.service';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {
  MakeRMQServiceProvider,
  MakeBookTCPServiceProvider,
} from '@Libs/common/index';
import { RMQService, TCPService } from '../../constants';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.BOOKS),
      MakeBookTCPServiceProvider(TCPService.BOOKS),
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, BooksStockService, BooksService],
})
export class OrdersModule {}
