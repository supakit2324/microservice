import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from "@Libs/common/index";

export class TopSellerEntity {
  @ApiProperty({
    type: String,
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  category: CategoryEnum;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'bookName',
  })
  bookName: string;

  @ApiProperty({
    type: String,
    example: 'BookId',
  })
  BookId: string;
}
