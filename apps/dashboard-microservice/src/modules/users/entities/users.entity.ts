import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
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
}
