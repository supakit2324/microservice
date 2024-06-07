import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordEntity {
  @ApiProperty({
    example: 'password',
    type: String,
  })
  password: string;

  @ApiProperty({
    example: 'confirmPassword',
    type: String,
  })
  confirmPassword: string;
}
