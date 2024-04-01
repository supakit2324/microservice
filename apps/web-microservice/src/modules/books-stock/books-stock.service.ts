import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { BooksStockInterface } from './interfaces/books-stock.interface';
import { BooksStockQueryDto } from './dto/books-stock-query.dto';
import { BooksStockEntity } from './entities/books-stock.entity';
import { UpdateBooksStockInterface } from './interfaces/update-books-stock.interface';
import { BOOKSSTOCK_CMD, RMQService } from '../../constants';
import { PaginationResponseInterface } from 'apps/interfaces/pagination.interface';

@Injectable()
export class BooksStockService {
  @Inject(RMQService.BOOKS) private readonly booksStockService: ClientProxy;

  getBookStockById(bookId: string): Promise<BooksStockInterface> {
    return lastValueFrom(
      this.booksStockService.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'get-book-stock-by-id',
        },
        bookId,
      ),
    );
  }

  updateStock(
    bookId: string,
    body: UpdateBooksStockInterface,
  ): Observable<UpdateBooksStockInterface> {
    return this.booksStockService.emit(
      {
        cmd: BOOKSSTOCK_CMD,
        method: 'update-stock',
      },
      {
        bookId,
        body,
      },
    );
  }

  async getPagination(
    query: BooksStockQueryDto,
  ): Promise<PaginationResponseInterface<BooksStockEntity>> {
    return lastValueFrom(
      this.booksStockService.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'getPagination',
        },
        query,
      ),
    );
  }
}
