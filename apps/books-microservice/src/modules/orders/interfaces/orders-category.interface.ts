import CategoryEnum from "../../books/enum/category.enum"

interface OrdersByCategoryItemsInterface {
    bookName: string,
    price: string
}

export interface OrdersByCategoryInterface {
    quantity: number
    totalPrice: number,
    books: OrdersByCategoryItemsInterface[]
    category: CategoryEnum
}