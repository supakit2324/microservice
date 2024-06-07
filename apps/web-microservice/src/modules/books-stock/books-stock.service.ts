import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { BooksStockInterface } from './interfaces/books-stock.interface';
import { BooksStockQueryDto } from './dto/books-stock-query.dto';
import { BooksStockEntity } from './entities/books-stock.entity';
import { UpdateBooksStockInterface } from './interfaces/update-books-stock.interface';
import { BOOKSSTOCK_CMD, RMQService, TCPService } from '../../constants';
import { PaginationResponseInterface } from '@Libs/common/index';

@Injectable()
export class BooksStockService {
  @Inject(RMQService.BOOKS) private readonly booksStockServiceRMQ: ClientProxy;
  @Inject(TCPService.BOOKS) private readonly booksStockServiceTCP: ClientProxy;

  getBookStockById(bookId: string): Promise<BooksStockInterface> {
    return lastValueFrom(
      this.booksStockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'get-book-stock-by-id',
        },
        bookId,
      ),
    );
  }

  async getPagination(
    query: BooksStockQueryDto,
  ): Promise<PaginationResponseInterface<BooksStockEntity>> {
    return lastValueFrom(
      this.booksStockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'getPagination',
        },
        query,
      ),
    );
  }

  updateStock(
    bookId: string,
    body: UpdateBooksStockInterface,
  ): Observable<UpdateBooksStockInterface> {
    return this.booksStockServiceRMQ.emit(
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
}
