import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductsDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductsDocument>,
  ) {}

  async create(data: { id: any; title: any }): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this, this.productModel.findOne({ id });
  }

  async update(id: string, data: { id: any; title: any }): Promise<Product> {
    return this.productModel.findOneAndUpdate({ id }, data);
  }

  async remove(id: string): Promise<void> {
    this.productModel.deleteOne({ id });
  }
}
