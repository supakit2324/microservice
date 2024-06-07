import { ApiProperty } from '@nestjs/swagger';
import { RolesUserEnum } from '@Libs/common/index';

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
    example: RolesUserEnum.MEMBER,
  })
  roles?: string;
}
