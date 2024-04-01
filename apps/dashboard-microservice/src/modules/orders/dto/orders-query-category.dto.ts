import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import CategoryEnum from "../../books/enum/category.enum";

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
