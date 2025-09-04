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
import { Paginate } from '@/common/paginate';
import { type MeteringPoint } from '@/common/prisma/prisma.client';
import { CreateMeteringPointDto } from './dtos/create-metering-point.dto';
import { FindManyMeteringPointsDto } from './dtos/find-many-metering-points.dto';
import { UpdateMeteringPointDto } from './dtos/update-metering-point.dto';
import { FindManyMeteringPointsPipe } from './pipes/find-many-metering-points.pipe';
import { MeteringPointService } from './metering-point.service';

@Controller('metering-points')
export class MeteringPointController {
  constructor(private readonly meteringPointService: MeteringPointService) {}

  @Get()
  findMany(
    @Query(FindManyMeteringPointsPipe) dto: FindManyMeteringPointsDto,
  ): Promise<Paginate<MeteringPoint>> {
    return this.meteringPointService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MeteringPoint> {
    return this.meteringPointService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMeteringPointDto): Promise<MeteringPoint> {
    return this.meteringPointService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeteringPointDto,
  ): Promise<MeteringPoint> {
    return this.meteringPointService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<MeteringPoint> {
    return this.meteringPointService.delete(id);
  }
}
