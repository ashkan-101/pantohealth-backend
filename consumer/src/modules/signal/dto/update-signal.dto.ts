import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSignalDto {
  @ApiProperty({description: 'Unique device ID', required: false})
  @IsString()
  @IsOptional()
  deviceId?: string;

  @ApiProperty({description: 'Signal timestamp in epoch ms', required: false})
  @IsNumber()
  @IsOptional()
  timestamp?: number;

  @ApiProperty({description: 'Number of readings in this signal', required: false})
  @IsNumber()
  @IsOptional()
  dataLength?: number;
}
