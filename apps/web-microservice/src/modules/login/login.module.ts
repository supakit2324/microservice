import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LoginService } from './login.service';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider } from '../../microservice.providers';
import { RMQService } from '../../constants';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS)
    ]),
  ],
  providers: [LoginService],
})
export class LoginModule {}
