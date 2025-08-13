import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConsumerModule } from './modules/consumer/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env')
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI as string),
    ConsumerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
