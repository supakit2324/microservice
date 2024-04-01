import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksMicroserive } from './books.microservice';
import { BooksStockService } from '../books-stock/books-stock.service';
import { model } from '../models/model';
import { DB_CONNECTION_NAME } from '../../constants';

@Module({
  imports: [MongooseModule.forFeature(model, DB_CONNECTION_NAME)],
  controllers: [BooksMicroserive],
  providers: [BooksService, BooksStockService],
  exports: [BooksService],
})
export class BooksModule {}
