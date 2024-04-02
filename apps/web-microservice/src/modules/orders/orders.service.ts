import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { OrdersInterface } from './interfaces/orders.interface';
import { UsersHistoryQueryDto } from './dto/users-history-query.dto';
import UsersOrderHistoryQueryEntity from './entities/users-order-history-query.entity';
import { ORDERS_CMD, RMQService, TCPService } from '../../constants';

@Injectable()
export class OrdersService {
  @Inject(RMQService.BOOKS) private readonly ordersServiceRMQ: ClientProxy;
  @Inject(TCPService.BOOKS) private readonly ordersServiceTCP: ClientProxy;

  createOrder(body: OrdersInterface): Observable<OrdersInterface> {
    return this.ordersServiceRMQ.emit(
      {
        cmd: ORDERS_CMD,
        method: 'create-order',
      },
      body,
    );
  }

  async getHistoryByOrder(
    userId: string,
    query: UsersHistoryQueryDto,
  ): Promise<UsersOrderHistoryQueryEntity> {
    return lastValueFrom(
      this.ordersServiceTCP.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-history-by-order',
        },
        {
          userId,
          body: query,
        },
      ),
    );
  }
}
