import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RunningOutQueryDTO {
  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsOptional()
  min: number;
}
