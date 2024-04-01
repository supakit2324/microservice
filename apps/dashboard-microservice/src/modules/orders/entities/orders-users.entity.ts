import { ApiProperty } from '@nestjs/swagger';
import { OrdersUsersItemsEntity } from './orders-users-items.entity';

export class OrdersUsersEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalPrice: number;

  @ApiProperty({
    type: [OrdersUsersItemsEntity],
  })
  books: OrdersUsersItemsEntity[];

  @ApiProperty({
    type: String,
    example: 'userId',
  })
  userId: string;
}
