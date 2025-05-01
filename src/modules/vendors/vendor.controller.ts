import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetVendorsQuery } from './queries/impl/get-vendors.query';
import { GetVendorByIdQuery } from './queries/impl/get-vendor-by-id.query';
import { CreateVendorCommand } from './commands/impl/create-vendor.command';
import { UpdateVendorCommand } from './commands/impl/update-vendor.command';
import { DeleteVendorCommand } from './commands/impl/delete-vendor.command';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<Vendor[]> {
    return this.queryBus.execute(new GetVendorsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vendor> {
    return this.queryBus.execute(new GetVendorByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new CreateVendorCommand(dto));
  }

  @Put(':id')
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
