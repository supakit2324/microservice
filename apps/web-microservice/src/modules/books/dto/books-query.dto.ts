import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { CategoryUtilsEnum, ESortBooksQuery } from '@Libs/common/index';

export class BooksQueryDto {
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

  @ApiProperty({
    enum: CategoryUtilsEnum,
    example: CategoryUtilsEnum.ALL,
  })
  @IsEnum(CategoryUtilsEnum)
  @IsNotEmpty()
  category: CategoryUtilsEnum;

  @ApiPropertyOptional({
    description: '',
  })
  @IsOptional()
  bookName: string;

  filter: Record<string, any>;

  sort: Record<string, any>;

  @ApiProperty({
    enum: ESortBooksQuery,
    example: ESortBooksQuery.PRICE_ASC,
  })
  @IsEnum(ESortBooksQuery)
  @IsNotEmpty()
  kSort: ESortBooksQuery;
}
