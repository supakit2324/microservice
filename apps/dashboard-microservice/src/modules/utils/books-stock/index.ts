import { ESortBooksQuery } from '../../books/dto/books-query.dto';
import CategoryBooksStockEnum from './eunm/category.enum';

export class BooksStockCategoryUtil {
  static categoryMap: Record<string, CategoryBooksStockEnum> = {
    [CategoryBooksStockEnum.ALL]: CategoryBooksStockEnum.ALL,
    [CategoryBooksStockEnum.ACTION]: CategoryBooksStockEnum.ACTION,
    [CategoryBooksStockEnum.ADVENTURE]: CategoryBooksStockEnum.ADVENTURE,
    [CategoryBooksStockEnum.BUSINESS]: CategoryBooksStockEnum.BUSINESS,
    [CategoryBooksStockEnum.COMEDY]: CategoryBooksStockEnum.COMEDY,
    [CategoryBooksStockEnum.CRAFTS]: CategoryBooksStockEnum.CRAFTS,
    [CategoryBooksStockEnum.CRIME]: CategoryBooksStockEnum.CRIME,
    [CategoryBooksStockEnum.DRAMA]: CategoryBooksStockEnum.DRAMA,
    [CategoryBooksStockEnum.GUIDE]: CategoryBooksStockEnum.GUIDE,
    [CategoryBooksStockEnum.HEALING]: CategoryBooksStockEnum.HEALING,
    [CategoryBooksStockEnum.HUMOR]: CategoryBooksStockEnum.HUMOR,
    [CategoryBooksStockEnum.JOURNAL]: CategoryBooksStockEnum.JOURNAL,
    [CategoryBooksStockEnum.MUSIC]: CategoryBooksStockEnum.MUSIC,
    [CategoryBooksStockEnum.ROMANTIC]: CategoryBooksStockEnum.ROMANTIC,
    [CategoryBooksStockEnum.SPORTS]: CategoryBooksStockEnum.SPORTS,
    [CategoryBooksStockEnum.TRAVEL]: CategoryBooksStockEnum.TRAVEL,
  };

  static getQueryByCategory(key: string, query?: Record<string, any>) {
    const category = this.categoryMap[key];
    if (category && category !== CategoryBooksStockEnum.ALL) {
      return { ...query, category };
    }
    return { ...query };
  }

  static sort(key: string) {
    const sortMap: Record<string, Record<string, string>> = {
      [ESortBooksQuery.PRICE_DESC]: { price: 'desc' },
      [ESortBooksQuery.PRICE_ASC]: { price: 'asc' },
      [ESortBooksQuery.QUANTITY_ASC]: { quantity: 'asc' },
      [ESortBooksQuery.QUANTITY_DESC]: { quantity: 'desc' },
    };

    return sortMap[key];
  }
}
