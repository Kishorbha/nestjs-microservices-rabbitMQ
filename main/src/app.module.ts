import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from './db';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule, HttpModule],
})
export class AppModule {}
