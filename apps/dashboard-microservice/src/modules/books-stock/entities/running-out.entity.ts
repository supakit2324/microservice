import { ApiProperty } from '@nestjs/swagger';

export class RunningOutEntity {
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
    type: Number,
    example: 1,
  })
  quantity: number;
}
