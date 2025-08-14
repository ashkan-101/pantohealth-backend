import { Controller } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EnvVariables } from "src/common/enum/EnvVariables";


@Controller()
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService
  ){}

  @EventPattern(EnvVariables.RABBITMQ_KEY_PATTERN)
  async reciveDataFromQueue(@Payload() rawData: any){
    await this.consumerService.processRawData(rawData)
  }
}
