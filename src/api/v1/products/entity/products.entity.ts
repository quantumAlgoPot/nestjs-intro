import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductsDocument = ProductsEntity &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class ProductsEntity {
  _id?: any;

  @Prop()
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  price: string;

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

export const ProductssSchema = SchemaFactory.createForClass(ProductsEntity);
