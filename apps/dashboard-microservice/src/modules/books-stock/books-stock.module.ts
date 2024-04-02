import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { BooksStockService } from './books-stock.service';
import { BooksStockController } from './books-stock.controller';
import { BooksService } from '../books/books.service';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider, MakeBookTCPServiceProvider } from '../../microservice.providers';
import { RMQService, TCPService } from '../../constants';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
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
