import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserEntity {
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
}
