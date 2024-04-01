import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersMicroservice } from './orders.microservice';
import { OrdersService } from './orders.service';
import { DB_CONNECTION_NAME } from '../../constants';
import { model } from '../models/model';

@Module({
  imports: [MongooseModule.forFeature(model, DB_CONNECTION_NAME)],
  controllers: [OrdersMicroservice],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
