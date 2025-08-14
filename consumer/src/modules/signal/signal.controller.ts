import { Controller, Get, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get a paginated list of signals, optionally sorted by newest' })
  @ApiQuery({ name: 'newest', required: false, type: Boolean, description: 'Sort signals by newest first' })
  @ApiResponse({ status: 200, description: 'List of signals with pagination' })
  async findMany(
    @Query() pagination: PaginationDTO,
    @Query('newest') newest?: boolean
  ) {
    return this.signalService.findMany(pagination, newest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal by ID' })
  @ApiParam({ name: 'id', description: 'Signal ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Signal deleted successfully.' })
  async delete(@Param('id') id: string) {
    return this.signalService.deleteById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a signal by ID' })
  @ApiParam({ name: 'id', description: 'Signal ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Signal updated successfully.' })
  async update(@Param('id') id: string, @Body() updateData: UpdateSignalDto) {
    return this.signalService.updateById(id, updateData);
  }
}
