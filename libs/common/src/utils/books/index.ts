import { CategoryUtilsEnum, ESortBooksQuery } from './enum/category.enum';

export class BooksCategoryUtil {
  static categoryMap: Record<string, CategoryUtilsEnum> = {
    [CategoryUtilsEnum.ALL]: CategoryUtilsEnum.ALL,
    [CategoryUtilsEnum.ACTION]: CategoryUtilsEnum.ACTION,
    [CategoryUtilsEnum.ADVENTURE]: CategoryUtilsEnum.ADVENTURE,
    [CategoryUtilsEnum.BUSINESS]: CategoryUtilsEnum.BUSINESS,
    [CategoryUtilsEnum.COMEDY]: CategoryUtilsEnum.COMEDY,
    [CategoryUtilsEnum.CRAFTS]: CategoryUtilsEnum.CRAFTS,
    [CategoryUtilsEnum.CRIME]: CategoryUtilsEnum.CRIME,
    [CategoryUtilsEnum.DRAMA]: CategoryUtilsEnum.DRAMA,
    [CategoryUtilsEnum.GUIDE]: CategoryUtilsEnum.GUIDE,
    [CategoryUtilsEnum.HEALING]: CategoryUtilsEnum.HEALING,
    [CategoryUtilsEnum.HUMOR]: CategoryUtilsEnum.HUMOR,
    [CategoryUtilsEnum.JOURNAL]: CategoryUtilsEnum.JOURNAL,
    [CategoryUtilsEnum.MUSIC]: CategoryUtilsEnum.MUSIC,
    [CategoryUtilsEnum.ROMANTIC]: CategoryUtilsEnum.ROMANTIC,
    [CategoryUtilsEnum.SPORTS]: CategoryUtilsEnum.SPORTS,
    [CategoryUtilsEnum.TRAVEL]: CategoryUtilsEnum.TRAVEL,
  };

  static getQueryByCategory(key: string, query?: Record<string, any>) {
    const category = this.categoryMap[key];
    if (category && category !== CategoryUtilsEnum.ALL) {
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
