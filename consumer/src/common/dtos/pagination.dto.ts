import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"

export class PaginationDTO {
  @ApiProperty({ required: false, type: 'number', example: 1, name: 'page', default: 1 })
  @IsOptional()
  page: number

  @ApiProperty({ required: false, type: 'number', example: 10, name: 'limit', default: 10 })
  @IsOptional()
  limit: number
}