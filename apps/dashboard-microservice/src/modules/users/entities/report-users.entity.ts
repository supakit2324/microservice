import { ApiProperty } from '@nestjs/swagger';

export class ReportUserEntity {
  @ApiProperty({
    example: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: 'username',
    type: String,
  })
  username: string;

  @ApiProperty({
    example: 'firstname',
    type: String,
  })
  firstname: string;

  @ApiProperty({
    example: 'lastname',
    type: String,
  })
  lastname: string;

  @ApiProperty({
    example: 'roles',
    type: String,
  })
  roles: string;

  @ApiProperty({
    example: 'status',
    type: String,
  })
  status: string;

  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  latestLogin: Date;

  @ApiProperty({
    example: 'userId',
    type: String,
  })
  userId: string;

  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  createdAt: Date;
}
