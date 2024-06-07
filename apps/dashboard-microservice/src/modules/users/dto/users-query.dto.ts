import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class UsersQueryDto {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({
    example: 20,
  })
  @Type(() => Number)
  @Max(100)
  @Min(1)
  perPage: number;

  @ApiPropertyOptional({
    description: 'username',
  })
  @IsOptional()
  username: string;

  @ApiPropertyOptional({
    description: 'first name ',
  })
  @IsOptional()
  firstname: string;

  @ApiPropertyOptional({
    description: 'last name ',
  })
  @IsOptional()
  lastname: string;

  filter: Record<string, any>;
}
