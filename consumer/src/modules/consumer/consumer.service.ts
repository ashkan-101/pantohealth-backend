import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsumerService {

  public async processData(rawData: any) {
  const result: any[] = [];

  for (const deviceId in rawData) {
    const deviceData = rawData[deviceId];
    const readings = deviceData.data.map((entry: any[]) => ({
    time: entry[0],
     coordinates: entry[1],
    }));

    result.push({
    deviceId,
    timestamp: deviceData.time,
    readings,
     });
     }
     return result;
  }
}