import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/user-login.dto';
import { lastValueFrom } from 'rxjs';
import { UsersInterface } from '../users/interfaces/users.interface';
import { UsersLoginEntity } from './entities/user-login-entity';
import { TCPService, USER_CMD } from '../../constants';

@Injectable()
export class AuthService {
  @Inject(TCPService.USERS) private readonly usersServiceTCP: ClientProxy;

  async loginUser(email: string, password: string): Promise<UsersLoginEntity> {
    const body: LoginUserDto = { email, password };
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'login',
        },
        body,
      ),
    );
  }

  async getByUserId(userId: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'getByUserId',
        },
        userId,
      ),
    );
  }

  async getByEmail(email: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'getByEmail',
        },
        email,
      ),
    );
  }

  async getByUsername(username: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'getByUsername',
        },
        username,
      ),
    );
  }

  async getBlockUser(email: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'getBlockUser',
        },
        email,
      ),
    );
  }

  async getAdminRole(email: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceTCP.send(
        {
          cmd: USER_CMD,
          method: 'get-admin-role',
        },
        email,
      ),
    );
  }
}
