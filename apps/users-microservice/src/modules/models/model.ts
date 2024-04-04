import { AmountLogin, AmountLoginSchema } from '../login/login.schema';
import { Users, UsersSchema } from '../users/users.schema';

export const model = [
  {
    name: Users.name,
    schema: UsersSchema,
  },
  {
    name: AmountLogin.name,
    schema: AmountLoginSchema,
  },
];
