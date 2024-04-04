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
import { RMQService, TCPService } from '../../constants';
import {
  MakeRMQServiceProvider,
  MakeBookTCPServiceProvider,
} from '@Libs/common/index';
@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.BOOKS),
      MakeRMQServiceProvider(RMQService.USERS),
      MakeBookTCPServiceProvider(TCPService.BOOKS),
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, BooksStockService, BooksService],
})
export class OrdersModule {}
