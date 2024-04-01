import { ApiProperty } from '@nestjs/swagger';
import { RolesUserEnum } from '../enum/roles-user.enum';

export class UpdateRolesDTO {
  @ApiProperty({
    type: String,
    example: 'userId',
    required: true,
  })
  userId: string;

  @ApiProperty({
    type: String,
    enum: RolesUserEnum,
    example: RolesUserEnum.USER,
  })
  roles?: string;
}
