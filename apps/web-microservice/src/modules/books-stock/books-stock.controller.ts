import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BooksStockService } from './books-stock.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import BooksStockQueryEntity from './entities/books-stock-query.entity';
import { BooksStockQueryDto } from './dto/books-stock-query.dto';
import { BooksCategoryUtil } from '@Libs/common/index';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('books-stock')
@ApiTags('books')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class BooksStockController {
  private readonly logger = new Logger(BooksStockController.name);

  constructor(private readonly booksStockService: BooksStockService) {}

  @Get('pagination')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: BooksStockQueryEntity,
  })
  async getPagination(
    @Query() query: BooksStockQueryDto,
  ): Promise<BooksStockQueryEntity> {
    const { filter, kSort, bookName } = query;

    query.sort = BooksCategoryUtil.sort(kSort) as Record<string, any>;

    if (bookName) {
      filter.bookName = { $regex: `${bookName}` };
    }

    try {
      return this.booksStockService.getPagination(query);
    } catch (e) {
      this.logger.error(
        `catch on getPagination: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
