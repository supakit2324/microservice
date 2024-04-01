import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LoginService } from './login.service';
import { LogginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider } from '../../microservice.providers';
import { RMQService } from '../../constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS)
    ])
  ],
  controllers: [LogginController],
  providers: [LoginService],
})
export class LoginModule {}
