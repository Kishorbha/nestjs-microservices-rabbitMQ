import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Product & Document;
@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  id: number;

  @Prop()
  title: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
