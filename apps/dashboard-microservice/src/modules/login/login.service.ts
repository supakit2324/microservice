import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CalendarDTO } from './dto/calendar.dto';
import { AMOUNT_LOGIN_CMD, TCPService } from '../../constants';

@Injectable()
export class LoginService {
  @Inject(TCPService.USERS) private readonly loginServiceTCP: ClientProxy;

  async getAmountUsersLogin(query: { date: Date }): Promise<CalendarDTO> {
    return lastValueFrom(
      this.loginServiceTCP.send(
        {
          cmd: AMOUNT_LOGIN_CMD,
          method: 'get-amount-users-login',
        },
        query,
      ),
    );
  }

  async getLastUsersLogin(query: { date: Date }): Promise<CalendarDTO> {
    return lastValueFrom(
      this.loginServiceTCP.send(
        {
          cmd: AMOUNT_LOGIN_CMD,
          method: 'get-last-users-login',
        },
        query,
      ),
    );
  }
}
