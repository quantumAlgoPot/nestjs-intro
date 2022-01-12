import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserEntity &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class UserEntity {
  _id?: any;

  @Prop({ required: true })
  username: string;

  @Prop({ default: '', required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
