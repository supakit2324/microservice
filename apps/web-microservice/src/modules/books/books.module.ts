import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
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
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
