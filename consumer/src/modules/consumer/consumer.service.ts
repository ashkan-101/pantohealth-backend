import { Injectable } from "@nestjs/common";
import { IProcessedSignal } from "src/common/interface/IProcessedSignal";

@Injectable()
export class ConsumerService {

  async processRawData(rawData: any) {
    const processedSignals: IProcessedSignal[] = [];

    for (const deviceId in rawData) {
      const deviceData = rawData[deviceId];
      const readings = deviceData.data.map((entry: any[]) => ({
        time: entry[0], 
        coordinates: entry[1],    
      }));

      processedSignals.push({
        deviceId,
        timestamp: deviceData.time, 
        dataLength: readings.length,
        readings,
      });
    }

    console.log(processedSignals);
    // return processedSignals;
  }
}