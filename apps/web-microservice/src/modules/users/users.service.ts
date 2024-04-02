import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-users.dto';
import { Observable } from 'rxjs';
import { ChangePasswordEntity } from './entities/change-password.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterface } from './interfaces/users.interface';
import { RMQService, TCPService, USER_CMD } from '../../constants';

@Injectable()
export class UsersService {
  @Inject(RMQService.USERS) private readonly usersServiceRMQ: ClientProxy;
  @Inject(TCPService.USERS) private readonly usersServiceTCP: ClientProxy;

  registerUser(body: CreateUserDto): Observable<CreateUserDto> {
    return this.usersServiceRMQ.emit(
      {
        cmd: USER_CMD,
        method: 'register',
      },
      body,
    );
  }

  changePasswordUser(
    userId: string,
    hashPassword: string,
  ): Observable<ChangePasswordEntity> {
    return this.usersServiceRMQ.emit(
      {
        cmd: USER_CMD,
        method: 'changePassword',
      },
      {
        userId,
        hashPassword,
      },
    );
  }

  updateUser(
    userId: string,
    update: UpdateUserDto,
  ): Observable<UsersInterface> {
    return this.usersServiceRMQ.emit(
      {
        cmd: USER_CMD,
        method: 'updateUser',
      },
      {
        userId,
        update,
      },
    );
  }
}
