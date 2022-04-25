import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('product')
export class ProductController {
  static IS_NOTIFIED = false;

  // client: ClientProxy;
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_') private readonly client: ClientProxy,
  ) {
    // this.client = ClientProxyFactory.create({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://rabbitmq:rabbitmq@192.168.0.109:5672'],
    //     queue: 'main_queue',
    //     queueOptions: { durable: false },
    //     socketOptions: { noDelay: true },
    //   },
    // });
  }

  @Get()
  async all() {
    this.client.emit('hello', 'get message form rabbit MQ');
    return this.productService.all();
  }
  @Post()
  async create(@Body('title') title: string) {
    const product = await this.productService.create({ title });
    this.client.emit('product_created', product);
    return product;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body('title') title: string) {
    return this.productService.update(id, {
      title,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  // @Post(':id/like')
  // async like(@Param('id') id: string) {
  //   const product = await this.productService.get(id);

  //   return this.productService.update(id, {
  //     likes: product.like + 1,
  //   });
  // }
}
