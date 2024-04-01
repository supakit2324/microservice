import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import * as dayjs from 'dayjs';

export class DayQueryDTO {
  @ApiPropertyOptional({
    description: 'startDay',
  })
  @ApiProperty({
    example: dayjs().format('YYYY-MM-DD'),
  })
  @IsOptional()
  startDay: Date;

  @ApiPropertyOptional({
    description: 'endDay',
  })
  @ApiProperty({
    example: dayjs().format('YYYY-MM-DD'),
  })
  @IsOptional()
  endDay: Date;
}
