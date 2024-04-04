import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BooksStockInterface } from './interfaces/books-stock.interface';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateBookStockDTO } from './dto/create-book-stock.dto';
import { BooksStockQueryDto } from './dto/books-stock-query.dto';
import { BooksStockEntity } from './entities/books-stock.entity';
import { RunningOutQueryDTO } from './dto/running-out-query.dto';
import { BOOKSSTOCK_CMD, RMQService, TCPService } from '../../constants';
import { PaginationResponseInterface } from '@Libs/common/index';

@Injectable()
export class BooksStockService {
  constructor(
    @Inject(RMQService.BOOKS) private readonly stockServiceRMQ: ClientProxy,
    @Inject(TCPService.BOOKS) private readonly stockServiceTCP: ClientProxy,
  ) {}

  createBookToStock(body: CreateBookStockDTO): Observable<BooksStockInterface> {
    return this.stockServiceRMQ.emit(
      {
        cmd: BOOKSSTOCK_CMD,
        method: 'create-book-to-stock',
      },
      {
        bookId: body.bookId,
        bookName: body.book.bookName,
        category: body.book.category,
        quantity: body.quantity,
      },
    );
  }

  addBookToStock(
    addStock: BooksStockInterface,
    quantity: number,
  ): Observable<BooksStockInterface> {
    return this.stockServiceRMQ.emit(
      {
        cmd: BOOKSSTOCK_CMD,
        method: 'add-book-in-stock',
      },
      {
        addStock,
        quantity,
      },
    );
  }

  async getAllBooksInStock(): Promise<BooksStockInterface[]> {
    return lastValueFrom(
      this.stockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'get-all-books-in-stock',
        },
        {},
      ),
    );
  }

  async getBookStockById(bookId: string): Promise<BooksStockInterface> {
    return lastValueFrom(
      this.stockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'get-book-stock-by-id',
        },
        bookId,
      ),
    );
  }

  async deleteBookToStock(bookId: string): Promise<BooksStockInterface> {
    return lastValueFrom(
      this.stockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'delete-book-in-stock',
        },
        bookId,
      ),
    );
  }

  async runningOut(query: RunningOutQueryDTO): Promise<BooksStockInterface> {
    return lastValueFrom(
      this.stockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'get-running-out',
        },
        query,
      ),
    );
  }

  async getPagination(
    query: BooksStockQueryDto,
  ): Promise<PaginationResponseInterface<BooksStockEntity>> {
    return lastValueFrom(
      this.stockServiceTCP.send(
        {
          cmd: BOOKSSTOCK_CMD,
          method: 'getPagination',
        },
        query,
      ),
    );
  }
}
