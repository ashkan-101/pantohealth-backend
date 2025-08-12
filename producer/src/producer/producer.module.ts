import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProducerService } from "./producer.service";
import { EnvVariables } from "src/enum/EnvVariables";
import { RabbitMQClients } from "src/enum/RabbitMQClients";


@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RabbitMQClients.RABBITMQ_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>(EnvVariables.RABBITMQ_URL) || 'amqp://localhost:5672'],
            queue: configService.get<string>(EnvVariables.RABBITMQ_QUEUE) || 'x-ray-queue',
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  providers: [ProducerService],
})
export class ProducerModule{}