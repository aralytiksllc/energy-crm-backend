// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Consumption } from '@/prisma/prisma.client';
import { CreateConsumptionDto } from './dtos/create-consumption.dto';
import { FindManyConsumptionsDto } from './dtos/find-many-consumptions.dto';
import { UpdateConsumptionDto } from './dtos/update-consumption.dto';
import { FindManyConsumptionsPipe } from './pipes/find-many-consumptions.pipe';
import { ConsumptionService } from './consumption.service';

@Controller('consumptions')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Get()
  findMany(
    @Query(FindManyConsumptionsPipe) dto: FindManyConsumptionsDto,
  ): Promise<Paged<Consumption>> {
    return this.consumptionService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Consumption> {
    return this.consumptionService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateConsumptionDto): Promise<Consumption> {
    return this.consumptionService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateConsumptionDto): Promise<Consumption> {
    return this.consumptionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Consumption> {
    return this.consumptionService.delete(+id);
  }
}
