import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-users.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { ChangePasswordEntity } from './entities/change-password.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterface } from './interfaces/users.interface';
import { UsersQueryDto } from './dto/users-query.dto';
import { UsersQueryResponseEntity } from './entities/users-query-response.entity';
import { RMQService, USER_CMD } from '../../constants';
import { PaginationResponseInterface } from 'apps/interfaces/pagination.interface';

@Injectable()
export class UsersService {
  @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy;

  registerUser(body: CreateUserDto): Observable<CreateUserDto> {
    return this.usersServiceQmq.emit(
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
    return this.usersServiceQmq.emit(
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

  updateUser(userId: string, update: UpdateUserDto): Observable<UpdateUserDto> {
    return this.usersServiceQmq.emit(
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

  async findNewUser(): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'find-new-user',
        },
        {},
      ),
    );
  }

  banUser(userId: string): Observable<UsersInterface> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'ban-user',
      },
      userId,
    );
  }

  unBanUser(userId: string): Observable<UsersInterface> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'un-ban-user',
      },
      userId,
    );
  }

  updateRole(update: {
    userId: string;
    roles: string;
  }): Observable<UsersInterface> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'update-role',
      },
      update,
    );
  }

  async getPagination(
    query: UsersQueryDto,
  ): Promise<PaginationResponseInterface<UsersQueryResponseEntity>> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'getPagination',
        },
        query,
      ),
    );
  }
}
