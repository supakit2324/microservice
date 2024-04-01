import CategoryEnum from "../../books/enum/category.enum";

interface TopSellCategoryItemInterface {
  bookId: string;
  bookName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}


export interface TopSellCategoryInterface {
  category: CategoryEnum;
  topSeller: TopSellCategoryItemInterface[];
}
