import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "apps/config/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseModuleAsyncOptions } from "../../mongoose.providers";
import { ThrottlerModule } from "@nestjs/throttler";
import { throttlerAsyncOptions, throttlerServiceProvider } from "../../throttler.providers";
import { BooksModule } from "../books/books.module";
import { BooksStockModule } from "../books-stock/books-stock.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    BooksModule,
    BooksStockModule,
    OrdersModule,
  ],
  providers: [
    throttlerServiceProvider
  ],
})
export class AppModule {}
