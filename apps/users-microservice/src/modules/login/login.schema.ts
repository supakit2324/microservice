import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'amount-login', timestamps: true, versionKey: false })
export class AmountLogin extends Document {
  @Prop({
    type: Date,
    index: true,
    default: new Date(),
  })
  firstTime: Date;

  @Prop({
    type: Number,
    index: true,
    default: null,
  })
  amountLogin: number;
}

export const AmountLoginSchema = SchemaFactory.createForClass(AmountLogin);
