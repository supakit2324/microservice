import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LoginService } from './login.service';
import { LogginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { MakeUserTCPServiceProvider } from "@Libs/common/index"
import { TCPService } from '../../constants';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    ThrottlerModule.forRoot(),
    ClientsModule.register([
      MakeUserTCPServiceProvider(TCPService.USERS)
    ])
  ],
  controllers: [LogginController],
  providers: [LoginService],
})
export class LoginModule {}
