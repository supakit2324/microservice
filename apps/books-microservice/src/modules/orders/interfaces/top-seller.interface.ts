import { CategoryEnum } from "@Libs/common/index";

export interface TopSellerInterface {
    category: CategoryEnum,
    quantity: number,
    bookName: string,
    BookId: string
}
