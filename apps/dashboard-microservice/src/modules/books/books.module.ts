import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
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
    CacheModule.register(),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.BOOKS),
      MakeBookTCPServiceProvider(TCPService.BOOKS),
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
