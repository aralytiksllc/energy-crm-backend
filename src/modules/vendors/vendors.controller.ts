import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DeleteVendorCommand } from './commands/impl/delete-vendor.command';
import { CreateVendorCommand } from './commands/impl/create-vendor.command';
import { UpdateVendorCommand } from './commands/impl/update-vendor.command';
import { GetVendorByIdQuery } from './queries/impl/get-vendor-by-id.query';
import { GetVendorsQuery } from './queries/impl/get-vendors.query';
import { Vendor } from './entities/vendor.entity';

@Controller('vendors')
export class VendorsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(
    @Query() queryParams: QueryParams<Vendor>,
  ): Promise<PaginationResult<Vendor>> {
    return this.queryBus.execute(new GetVendorsQuery(queryParams));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vendor> {
    return this.queryBus.execute(new GetVendorByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new CreateVendorCommand(dto));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVendorDto,
  ): Promise<Vendor> {
    return this.commandBus.execute(new UpdateVendorCommand(id, dto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteVendorCommand(id));
  }
}
