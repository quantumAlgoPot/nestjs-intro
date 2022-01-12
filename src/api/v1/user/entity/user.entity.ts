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
  desc: string;

  @Prop({ default: '' })
  price: string;
}

export const ProductssSchema = SchemaFactory.createForClass(ProductsEntity);
