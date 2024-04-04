import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from "@Libs/common/index";

export class OrdersHistoryEntity {
  @ApiProperty({
    type: String,
    example: 'bookName',
  })
  bookName: string;

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  category: CategoryEnum;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  total: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  buyAt: Date;
}
