import { CategoryEnum } from '@Libs/common/index';

export interface UpdateBookInterface {
  bookId: string;
  bookName: string;
  price: number;
  imageUrl: string;
  publisher: string;
  category: CategoryEnum;
  isAvailable: boolean;
}
