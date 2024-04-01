import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import * as dayjs from 'dayjs';

export class CalendarDTO {
  @ApiProperty({
    type: Date,
    example: dayjs().format('YYYY-MM-DD'),
  })
  @IsOptional()
  @IsNotEmpty()
  date: Date;
}
