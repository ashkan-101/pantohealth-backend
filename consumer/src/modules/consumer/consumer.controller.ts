import { Controller } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { EventPattern, Payload } from "@nestjs/microservices";


@Controller()
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService
  ){}

  @EventPattern('x-ray')
  async reciveDataFromQueue(@Payload() rawData: any){
    await this.consumerService.processData(rawData)
  }
}
