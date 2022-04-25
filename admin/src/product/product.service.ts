import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductsDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductsDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data: { title: string }): Promise<Product> {
    return this.productModel.create(data);
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string, data: { title: string }): Promise<any> {
    return this.productModel.findByIdAndUpdate(id, data);
  }

  async remove(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id);
  }
}
