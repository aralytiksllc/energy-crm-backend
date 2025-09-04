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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { memoryStorage } from 'multer';
import { Req } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import type { Consumption } from '@/prisma/prisma.service';
import { CreateConsumptionFileDto } from './dtos/create-consumption-file.dto';
import { CreateConsumptionDto } from './dtos/create-consumption.dto';
import { FindManyConsumptionsDto } from './dtos/find-many-consumptions.dto';
import { UpdateConsumptionDto } from './dtos/update-consumption.dto';
import { FindManyConsumptionsPipe } from './pipes/find-many-consumptions.pipe';
import { ConsumptionService } from './consumption.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvParserInterceptor } from '@/common/csv-parser/csv-parser.interceptor';

@Controller('consumptions')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Get()
  findMany(
    @Query(FindManyConsumptionsPipe) dto: FindManyConsumptionsDto,
  ): Promise<Paginate<Consumption>> {
    return this.consumptionService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Consumption> {
    return this.consumptionService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', { storage: memoryStorage() }),
    new CsvParserInterceptor(CreateConsumptionDto),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateConsumptionFileDto,
    @Req() req: Request,
  ) {
    const errors = req['csvErrors'] ?? [];
    const rows = (req['csvData'] ?? []) as CreateConsumptionDto[];

    if (errors.length > 0) {
      return {
        message: 'CSV processing completed with errors.',
        errors,
      };
    }

    const data = await this.consumptionService.create(file, dto, rows);

    return {
      message: 'CSV processing completed without errors.',
      data,
    };
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateConsumptionDto,
  ): Promise<Consumption> {
    return this.consumptionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Consumption> {
    return this.consumptionService.delete(id);
  }
}
