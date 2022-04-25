import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // @Post(':id/like')
  // async like(@Param('id') id: string) {
  //   const product = await this.productService.findOne(id);
  //   this.httpService
  //     .post(`http://localhost:8000/api/products/${id}/like`, {})
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  //   return this.productService.update(id, {
  //     likes: product.like + 1,
  //   });
  // }

  @EventPattern('hello')
  async list(product: any) {
    console.log(product);
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    console.log(product);
    await this.productService.create({
      id: product.id,
      title: product.title,
    });
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
    });
  }

  @EventPattern('product_deleted')
  async productDeleted(id: string) {
    await this.productService.remove(id);
  }
}
