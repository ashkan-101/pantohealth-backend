import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RABBITMQ_QUEUE || 'x-ray-queue',
      queueOptions: { durable: true }
    }
  } as RmqOptions);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}))
  
  await app.listen();
  console.log('consumer microservice is running ... ');
}
bootstrap();
