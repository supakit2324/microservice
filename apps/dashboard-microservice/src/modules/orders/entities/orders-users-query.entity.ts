import { ApiProperty } from '@nestjs/swagger';
import { OrdersUsersEntity } from './orders-users.entity';

export class OrdersUsersQueryEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    type: [OrdersUsersEntity],
  })
  records: OrdersUsersEntity[];

  @ApiProperty({
    type: Number,
    example: 100,
  })
  count: number;
}
