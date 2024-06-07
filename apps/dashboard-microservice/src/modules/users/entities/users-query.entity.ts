import { ApiProperty } from '@nestjs/swagger';
import { UsersQueryResponseEntity } from './users-query-response.entity';

class UsersQueryEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  count: number;

  @ApiProperty({
    type: [UsersQueryResponseEntity],
  })
  records: UsersQueryResponseEntity[];
}

export default UsersQueryEntity;
