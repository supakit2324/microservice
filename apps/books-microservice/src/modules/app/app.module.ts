import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BooksModule } from "../books/books.module";
import { BooksStockModule } from "../books-stock/books-stock.module";
import { OrdersModule } from "../orders/orders.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../config/configuration";
import { mongooseModuleAsyncOptions } from "@Libs/common/index"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    BooksModule,
    BooksStockModule,
    OrdersModule,
  ],
})
export class AppModule {}
