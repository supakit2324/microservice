import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from '@Libs/common/index';

class OrdersItems {
  @ApiProperty({
    type: String,
    example: 'bookName',
  })
  bookName: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  price: number;
}

class OrdersQueryByCategoryEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  totalPrice: number;

  @ApiProperty({
    type: [OrdersItems],
  })
  books: OrdersItems[];

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  category: CategoryEnum;
}

export default OrdersQueryByCategoryEntity;
