export interface IProcessedSignal {
  deviceId: string;
  timestamp: number;
  dataLength: number;
  readings: { time: number; coordinates: number[] }[];
}
