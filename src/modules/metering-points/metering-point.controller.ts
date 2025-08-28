// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { MeteringPoint } from '@/prisma/prisma.client';
import { CreateMeteringPointDto } from './dtos/create-metering-point.dto';
import { FindManyMeteringPointsDto } from './dtos/find-many-metering-points.dto';
import { UpdateMeteringPointDto } from './dtos/update-metering-point.dto';
import { FindManyMeteringPointsPipe } from './pipes/find-many-metering-points.pipe';
import { MeteringPointService } from './metering-point.service';

@Controller('branches/:branchId/metering-pointes')
export class MeteringPointController {
  constructor(private readonly meteringPointService: MeteringPointService) {}

  @Get()
  findMany(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Query(FindManyMeteringPointsPipe) dto: FindManyMeteringPointsDto,
  ): Promise<Paged<MeteringPoint>> {
    return this.meteringPointService.findMany(branchId, dto);
  }

  @Get(':id')
  findOne(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeteringPoint> {
    return this.meteringPointService.findOne(branchId, id);
  }

  @Post()
  create(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Body() dto: CreateMeteringPointDto,
  ): Promise<MeteringPoint> {
    return this.meteringPointService.create(branchId, dto);
  }

  @Put(':id')
  update(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeteringPointDto,
  ): Promise<MeteringPoint> {
    return this.meteringPointService.update(branchId, id, dto);
  }

  @Delete(':id')
  remove(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeteringPoint> {
    return this.meteringPointService.delete(branchId, id);
  }
}
