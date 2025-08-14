import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common';
import { swaggerSetup } from './configs/swagger.config';
import { EnvVariables } from './common/enum/EnvVariables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}))
  swaggerSetup(app)

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env[EnvVariables.RABBITMQ_URL] || 'amqp://localhost:5672'],
      queue: process.env[EnvVariables.RABBITMQ_QUEUE] || 'x-ray-queue',
      queueOptions: { durable: true }
    }
  })

  await app.listen(4000);
  await app.startAllMicroservices()
  console.log('consumer microservice is running ... ');
  console.log('api-document: http://localhost:4000/api-document ');
}
bootstrap();
