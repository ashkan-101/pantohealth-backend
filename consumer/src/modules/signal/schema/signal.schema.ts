import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'signals', timestamps: true })
export class Signal {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ 
    type: [{ 
      time: Number, 
      coordinates: [Number] 
    }],
    _id: false,
    required: true 
  })
  readings: { time: number; coordinates: number[] }[];
}

export type SignalDocument = HydratedDocument<Signal>
export const SignalSchema = SchemaFactory.createForClass(Signal);