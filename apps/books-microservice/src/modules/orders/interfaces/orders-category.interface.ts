import { CategoryEnum } from '@Libs/common/index';

interface OrdersByCategoryItemsInterface {
  bookName: string;
  price: string;
}

export interface OrdersByCategoryInterface {
  quantity: number;
  totalPrice: number;
  books: OrdersByCategoryItemsInterface[];
  category: CategoryEnum;
}
