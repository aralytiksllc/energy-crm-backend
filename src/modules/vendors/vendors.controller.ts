import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Vendor } from '@/entities/vendor.entity';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { UpdateVendorDto } from './dtos/update-vendor.dto';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  findMany(@Query() query: QueryParams<Vendor>): Promise<Paged<Vendor>> {
    return this.vendorsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vendor> {
    return this.vendorsService.findOne(+id);
  }

  @Post()
  create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorsService.create(createVendorDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    return this.vendorsService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.vendorsService.delete(+id);
  }
}
