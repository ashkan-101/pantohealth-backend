import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron } from "@nestjs/schedule";
import { readFileSync } from "fs";
import { join } from "path";
import { catchError, lastValueFrom } from "rxjs";
import { EnvVariables } from "src/enum/EnvVariables";
import { RabbitMQClients } from "src/enum/RabbitMQClients";


@Injectable()
export class ProducerService {
  constructor(
    @Inject(RabbitMQClients.RABBITMQ_SERVICE) private readonly client: ClientProxy,
  ){}

  private readXRayData(){
    const filePath = join(process.cwd(), 'sample-data.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  }

  private async publishXRayDataToQueue(data: any): Promise<void>{
    await lastValueFrom(this.client.emit(EnvVariables.RABBITMQ_QUEUE, data).pipe(
      catchError(err => { throw err} )
    ))
  }

  @Cron('*/60 * * * * *')
  async handleScheduledTask() {
    const data = this.readXRayData();
    await this.publishXRayDataToQueue(data);
    console.log('Data sent to RabbitMQ at', new Date().toISOString());
  }
}