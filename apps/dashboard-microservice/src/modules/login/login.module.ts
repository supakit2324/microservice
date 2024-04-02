import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LoginService } from './login.service';
import { LogginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { MakeUserTCPServiceProvider } from '../../microservice.providers';
import { TCPService } from '../../constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      MakeUserTCPServiceProvider(TCPService.USERS)
    ])
  ],
  controllers: [LogginController],
  providers: [LoginService],
})
export class LoginModule {}
