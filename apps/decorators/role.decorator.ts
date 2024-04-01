import { SetMetadata } from '@nestjs/common';
import { RolesUserEnum } from 'apps/enum/roles-user.enum';

export const UseRoles = (...roles: RolesUserEnum[]) =>
  SetMetadata('roles', roles);
