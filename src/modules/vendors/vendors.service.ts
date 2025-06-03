import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paging } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Vendor } from '@/models/vendor.model';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { GetVendorsQuery } from './queries/get-vendors.query';
import { GetVendorByIdQuery } from './queries/get-vendor-by-id.query';
import { DeleteVendorCommand } from './commands/delete-vendor.command';
import { CreateVendorCommand } from './commands/create-vendor.command';
import { UpdateVendorCommand } from './commands/update-vendor.command';

@Injectable()
export class VendorsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Vendor>): Promise<Paging<Vendor>> {
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
