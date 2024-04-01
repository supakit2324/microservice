import { ApiProperty } from '@nestjs/swagger';
import CategoryEnum from '../enum/category.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateBookDTO {
  @ApiProperty({
    type: String,
    example: 'bookId',
  })
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({
    type: String,
    example: 'bookName',
  })
  @IsNotEmpty()
  bookName: string;

  @ApiProperty({
    type: String,
    example: 'publisher',
  })
  @IsNotEmpty()
  publisher: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  category: CategoryEnum;

  @ApiProperty({
    type: String,
    example: 'imageUrl',
  })
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isAvailable: boolean;
}
