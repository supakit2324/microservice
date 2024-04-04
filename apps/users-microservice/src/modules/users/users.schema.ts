import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { RolesUserEnum, StatusUser } from '@Libs/common/index'

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class Users {
  @Prop({
    type: String,
    unique: true,
    required: true,
    default: () => uuidv4(),
  })
  userId?: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    index: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  token?: string;

  @Prop({
    type: String,
    default: null,
  })
  refreshToken?: string;

  @Prop({
    type: String,
    enum: RolesUserEnum,
    default: RolesUserEnum.MEMBER,
  })
  roles?: RolesUserEnum;

  @Prop({
    type: String,
    enum: StatusUser,
    default: StatusUser.ACTIVE,
  })
  status?: StatusUser;

  @Prop({
    type: Date,
    default: null,
  })
  latestLogin?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
