import { ApiProperty } from '@nestjs/swagger';

export class TopUserBoughtEntity {
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

  @ApiProperty({
    type: String,
    example: 'userId',
  })
  userId: string;
}
