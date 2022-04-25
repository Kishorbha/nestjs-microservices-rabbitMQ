import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, DatabaseModule],
})
export class AppModule {}
