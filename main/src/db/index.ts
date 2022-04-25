import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kishor:kishorbha@cluster0.wblx5.mongodb.net/microservices?retryWrites=true&w=majority',
    ),
  ],
})
export class DatabaseModule {}
