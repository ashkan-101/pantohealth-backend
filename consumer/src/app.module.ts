import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { SignalModule } from './modules/signal/signal.module';
import { EnvVariables } from './common/enum/EnvVariables';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env')
    }),
    MongooseModule.forRoot(process.env[EnvVariables.MONGO_URI] as string),
    ConsumerModule,
    SignalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
