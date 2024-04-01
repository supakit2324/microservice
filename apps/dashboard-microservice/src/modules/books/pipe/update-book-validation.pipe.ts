import {
  BadRequestException,
  Inject,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { BooksService } from '../books.service';
import { UpdateBookDTO } from '../dto/update-book.dto';
import { BooksInterface } from '../interfaces/books.interface';

export class UpdateBookValidationPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateBookValidationPipe.name);

  constructor(
    @Inject(BooksService) private readonly booksService: BooksService,
  ) {}

  async transform(body: UpdateBookDTO): Promise<UpdateBookDTO> {
    let book: BooksInterface;
    try {
      book = await this.booksService.getBookById(body.bookId);
    } catch (e) {
      this.logger.error(`catch on books: ${e?.message ?? JSON.stringify(e)}`);
      throw new BadRequestException({
        message: `${e?.message ?? e}`,
      });
    }

    if (!book) {
      this.logger.error(`catch on find books ${body.bookId} not found`);
      throw new BadRequestException({
        message: `${body.bookId} not found`,
      });
    }

    return body;
  }
}
