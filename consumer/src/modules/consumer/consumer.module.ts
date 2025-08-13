import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ConsumerController } from "./consumer.controller";
import { SignalModule } from "../signal/signal.module";


@Module({
  providers: [ConsumerService],
  controllers: [ ConsumerController],
  imports: [ SignalModule ]
})
export class ConsumerModule{}