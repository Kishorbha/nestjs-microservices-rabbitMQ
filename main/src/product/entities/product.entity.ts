import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductsDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  id: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
