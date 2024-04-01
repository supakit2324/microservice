import { ApiProperty } from '@nestjs/swagger';

export class TopSellCategoryItemEntity {
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
  quantity: number;
}
