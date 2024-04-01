import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AmountLogin } from './login.schema';
import { Model } from 'mongoose';
import { DB_CONNECTION_NAME } from '../../constants';

@Injectable()
export class LoginService {
  @InjectModel(AmountLogin.name, DB_CONNECTION_NAME)
  private readonly amountLoginModel: Model<AmountLogin>;

  getamountLoginModel(): Model<AmountLogin> {
    return this.amountLoginModel;
  }
}
