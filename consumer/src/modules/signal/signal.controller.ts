import { Controller, Get, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SignalService } from './signal.service'; 
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDTO } from 'src/common/dtos/pagination.dto'; 
import { UpdateSignalDto } from './dto/update-signal.dto';

@ApiTags('Signals')
@Controller('signals')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a signal by ID' })
  @ApiParam({ name: 'id', description: 'Signal ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Signal found successfully.' })
  async findOne(@Param('id') id: string) {
    return this.signalService.findOnebyId(id);
  }

  @Get()
  @Pagination()
  @ApiOperation({ summary: 'Get a paginated list of signals' })
  @ApiResponse({ status: 200, description: 'List of signals with pagination' })
  async findMany(@Query() pagination: PaginationDTO) {
    return this.signalService.findMany(pagination);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal by ID' })
  @ApiParam({ name: 'id', description: 'Signal ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Signal deleted successfully.' })
  async delete(@Param('id') id: string) {
    return this.signalService.deleteById(id);
  }

  @Put(':id')
  async update( @Param() id: string, @Body() updateData: UpdateSignalDto ){
    return this.signalService.updateById(id, updateData)
  }
}
