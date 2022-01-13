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

  @Prop({ default: false, required: false })
  isDeleted: boolean;

  @Prop({ default: null, required: false })
  deletedAt: Date;

  @Prop({ default: true, required: false })
  isCreated: boolean;

  @Prop({ default: Date.now, required: false })
  createdAt: Date;

  @Prop({ default: false, required: false })
  isUpdated: boolean;

  @Prop({ default: null, required: false })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
