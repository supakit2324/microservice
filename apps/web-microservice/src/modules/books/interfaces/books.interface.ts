import { CategoryEnum } from '@Libs/common/index';

export interface BooksInterface {
  bookName: string;
  price: number;
  imageUrl: string;
  publisher: string;
  category: CategoryEnum;
  isAvailable: boolean;
}
