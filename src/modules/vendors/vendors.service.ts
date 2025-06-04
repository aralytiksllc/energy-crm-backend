import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Vendor } from '@/models/vendor.model';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { UpdateVendorDto } from './dtos/update-vendor.dto';
import { CreateVendorCommand } from './commands/create-vendor.command';
import { UpdateVendorCommand } from './commands/update-vendor.command';
import { DeleteVendorCommand } from './commands/delete-vendor.command';
import { FindManyVendorsQuery } from './queries/find-many-vendors.query';
import { FindOneVendorQuery } from './queries/find-one-vendor.query';

@Injectable()
export class VendorsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(queryParams: QueryParams<Vendor>): Promise<Paged<Vendor>> {
    return this.queryBus.execute(new FindManyVendorsQuery(queryParams));
  }

  async findOne(id: number): Promise<Vendor> {
    return this.queryBus.execute(new FindOneVendorQuery(id));
  }

  async create(dto: CreateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new CreateVendorCommand(dto));
  }

  async update(id: number, dto: UpdateVendorDto): Promise<Vendor> {
    return this.commandBus.execute(new UpdateVendorCommand(id, dto));
  }

  async delete(id: number): Promise<void> {
    return this.commandBus.execute(new DeleteVendorCommand(id));
  }
}
