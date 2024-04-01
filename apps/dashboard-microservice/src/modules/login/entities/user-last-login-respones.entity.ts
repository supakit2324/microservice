import { ApiProperty } from '@nestjs/swagger';

export class UserLastLoginResponseEntity {
  @ApiProperty({
    type: String,
    example: 'email',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'member',
  })
  roles: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  latestLogin: string;

  @ApiProperty({
    type: String,
    example: 'userId',
  })
  userId: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: string;
}
