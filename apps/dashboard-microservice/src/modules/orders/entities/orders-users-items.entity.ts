import { ApiProperty } from '@nestjs/swagger';
import CategoryEnum from '../../books/enum/category.enum';

export class OrdersUsersItemsEntity {
  @ApiProperty({
    type: String,
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  category: CategoryEnum;

  @ApiProperty({
    type: String,
    example: 'bookId',
  })
  bookId: string;

  @ApiProperty({
    type: String,
    example: 'bookName',
  })
  bookName: string;

  @ApiProperty({
    type: String,
    example: 'imageUrl',
  })
  imageUrl: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalPrice: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: number;
}
