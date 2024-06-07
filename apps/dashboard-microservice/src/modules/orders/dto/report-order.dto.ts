import { ApiProperty } from '@nestjs/swagger';

export class ReportOrderDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalPrice: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  count: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  date: Date;
}
