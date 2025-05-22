import { Injectable } from '@nestjs/common';
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
import { Vendor } from './models/vendor.model';

@Injectable()
export class VendorsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Vendor>): Promise<PaginationResult<Vendor>> {
    return this.queryBus.execute(new GetVendorsQuery(queryParams));
  }

  async findOne(id: string): Promise<Vendor> {
    return this.queryBus.execute(new GetVendorByIdQuery(id));
  }

  async create(dto: CreateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new CreateVendorCommand(dto));
  }

  async update(id: string, dto: UpdateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new UpdateVendorCommand(id, dto));
  }

  async delete(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteVendorCommand(id));
  }
} 