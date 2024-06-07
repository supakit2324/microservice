import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BooksStock } from './books-stock.schema';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { DB_CONNECTION_NAME } from '../../constants';

@Injectable()
export class BooksStockService {
  @InjectModel(BooksStock.name, DB_CONNECTION_NAME)
  private readonly booksStockModel: Model<BooksStock>;

  getBooksStockModel(): Model<BooksStock> {
    return this.booksStockModel;
  }

  async getPagination(
    conditions: FilterQuery<BooksStock>,
    pagination?: { page: number; perPage: number },
    sort: { [key: string]: SortOrder } | string = { _id: 1 },
    select = { _id: 0 },
  ): Promise<[BooksStock[], number]> {
    const { page = 1, perPage = 20 } = pagination;

    return Promise.all([
      this.booksStockModel
        .find(conditions)
        .select(select)
        .sort(sort)
        .skip((page - 1) * +perPage)
        .limit(+perPage)
        .lean(),
      this.booksStockModel.countDocuments(conditions),
    ]);
  }
}
