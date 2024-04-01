import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DayQueryDTO } from './dto/day-query.dto';
import { TopUserBoughtInterface } from './interfaces/top-users-bought.interface';
import { ReportOrderInterface } from './interfaces/report-order.interface';
import { TopSellerInterface } from './interfaces/top-seller.interface';
import { OrdersUsersInterface } from './interfaces/orders-users-query.interface';
import { TopSellCategoryInterface } from './interfaces/top-sell-category.interface';
import { OrdersQueryByCategoryDTO } from './dto/orders-query-category.dto';
import OrdersQueryByCategoryEntity from './entities/orders-query-category.entity';
import { ORDERS_CMD, RMQService } from '../../constants';
import { PageQueryDto } from '../../dto/query.dto';

@Injectable()
export class OrdersService {
  @Inject(RMQService.BOOKS) private readonly ordersServiceRMQ: ClientProxy;

  async getTopSeller(): Promise<TopSellerInterface> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-top-seller',
        },
        {},
      ),
    );
  }

  async getTopSellerByCategory(): Promise<TopSellCategoryInterface> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-top-seller-by-category',
        },
        {},
      ),
    );
  }

  async getOrdersUsers(query: PageQueryDto): Promise<OrdersUsersInterface> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-order-users',
        },
        query,
      ),
    );
  }

  async getTopUserBought(query: PageQueryDto): Promise<TopUserBoughtInterface> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-top-user-bought',
        },
        query,
      ),
    );
  }

  async getOrderByCategory(query: OrdersQueryByCategoryDTO): Promise<OrdersQueryByCategoryEntity> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-order-by-category',
        },
        query
      )
    )
  }

  async getReport(query: DayQueryDTO): Promise<ReportOrderInterface[]> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-report',
        },
        query,
      ),
    );
  }
}
