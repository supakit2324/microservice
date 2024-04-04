import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { BooksStockService } from './books-stock.service';
import { BooksStockController } from './books-stock.controller';
import { BooksService } from '../books/books.service';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider, MakeBookTCPServiceProvider } from "@Libs/common/index"
import { RMQService, TCPService } from '../../constants';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ThrottlerModule.forRoot(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.BOOKS),
      MakeBookTCPServiceProvider(TCPService.BOOKS)
    ])
  ],
  controllers: [BooksStockController],
  providers: [BooksStockService, BooksService],
  exports: [BooksStockService],
})
export class BooksStockModule {}
