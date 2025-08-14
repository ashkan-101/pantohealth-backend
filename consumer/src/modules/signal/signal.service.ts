import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal, SignalDocument } from './schema/signal.schema'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'; 
import { paginationSolver, paginationGenerator } from '../../common/util/pagination.util'
import { IProcessedSignal } from 'src/common/interface/IProcessedSignal';
import { UpdateSignalDto } from './dto/update-signal.dto';

@Injectable()
export class SignalService {
  constructor(
    @InjectModel(Signal.name) private readonly signalModel: Model<SignalDocument>,
  ) {}

  async create(data: IProcessedSignal): Promise<Signal> {
    const signal = await this.signalModel.create(data)
    return await signal.save()
  }

  async findOne(id: string): Promise<Signal> {
    const signal = await this.signalModel.findById(id).exec();
    if (!signal) {
      throw new NotFoundException(`Signal with ID "${id}" not found`);
    }
    return signal;
  }

  async findMany(pagination: PaginationDTO) {
    const { page, limit, skip } = paginationSolver(pagination);

    const [items, count] = await Promise.all([
      this.signalModel.find().skip(skip).limit(limit).exec(),
      this.signalModel.countDocuments().exec(),
    ]);

    return {
      data: items,
      pagination: paginationGenerator(count, page, limit),
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.signalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Signal with ID "${id}" not found`);
    }
    return { message: 'Signal deleted successfully' };
  }

  async updateById(id: string, updateData: UpdateSignalDto){
    const { 
      deviceId,
      timestamp,
      dataLength
    } = updateData
    
    const updateResult = await this.signalModel.updateOne({ _id: id}, 
      { $set: {
        deviceId,
        timestamp,
        dataLength
      }}
    )

    if(updateResult.matchedCount === 0) {
      throw new NotFoundException(`Signal with id ${id} not found`)
    }
    
    return {
      message: 'signal update successfuly!'
    }
  }
}