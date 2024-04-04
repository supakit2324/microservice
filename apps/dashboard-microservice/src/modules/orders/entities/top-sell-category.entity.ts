import { ApiProperty } from '@nestjs/swagger';
import { TopSellCategoryItemEntity } from './top-sell-category-item.entity';
import { CategoryEnum } from "@Libs/common/index";

export class TopSellCategoryEntity {
  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ACTION,
  })
  category: CategoryEnum;

  @ApiProperty({
    type: [TopSellCategoryItemEntity],
  })
  topSeller: TopSellCategoryItemEntity[];
}
