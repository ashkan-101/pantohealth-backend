import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { join } from "path";
import { ProducerModule } from "./producer/producer.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env')
    }),
    ScheduleModule.forRoot(),
    ProducerModule
  ],
  providers: [],
  controllers: []
})
export class AppModule{}