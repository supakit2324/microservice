import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CategoryEnum } from "@Libs/common/index";

export class OrdersQueryByCategoryDTO {
    @ApiProperty({
        enum: CategoryEnum,
        example: CategoryEnum.ACTION
    })
    @IsOptional()
    @IsEnum(CategoryEnum)
    category: CategoryEnum

    filter: Record<string, any>;
}
