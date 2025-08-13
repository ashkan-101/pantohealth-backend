import { Signal } from "../schema/signal.schema";

export interface ICreateSignal {
  create(data: Partial<Signal>): Promise<Signal>
}