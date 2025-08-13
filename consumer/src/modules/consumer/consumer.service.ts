import { Injectable } from "@nestjs/common";
import { IProcessedSignal } from "src/common/interface/IProcessedSignal";
import { ICreateSignal } from "../signal/interface/create-signal";
import { SignalService } from "../signal/signal.service";

@Injectable()
export class ConsumerService {
  private readonly createSignal: ICreateSignal
  constructor(signalService: SignalService){
    this.createSignal = signalService
  }
  async processRawData(rawData: any) {

    for (const deviceId in rawData) {
      const deviceData = rawData[deviceId];
      const readings = deviceData.data.map((entry: any[]) => ({
        time: entry[0], 
        coordinates: entry[1],    
      }));

      const processedData: IProcessedSignal = {
        deviceId,
        timestamp: deviceData.time, 
        dataLength: readings.length,
        readings,
      }
      await this.createSignal.create(processedData)
    }
  }
}