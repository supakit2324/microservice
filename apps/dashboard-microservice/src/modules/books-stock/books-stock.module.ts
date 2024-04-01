import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { BooksStockService } from './books-stock.service';
import { BooksStockController } from './books-stock.controller';
import { BooksService } from '../books/books.service';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider } from '../../microservice.providers';
import { RMQService } from '../../constants';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.BOOKS)
    ])
  ],
  controllers: [BooksStockController],
  providers: [BooksStockService, BooksService],
  exports: [BooksStockService],
})
export class BooksStockModule {}
