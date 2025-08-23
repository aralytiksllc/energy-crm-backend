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
import type { Branch } from '@/prisma/prisma.client';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { FindManyBranchsDto } from './dtos/find-many-branchs.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';
import { FindManyBranchsPipe } from './pipes/find-many-branchs.pipe';
import { BranchService } from './branch.service';

@Controller('customers/:customerId/branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  findMany(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Query(FindManyBranchsPipe) dto: FindManyBranchsDto,
  ): Promise<Paged<Branch>> {
    return this.branchService.findMany(customerId, dto);
  }

  @Get(':id')
  findOne(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Branch> {
    return this.branchService.findOne(customerId, id);
  }

  @Post()
  create(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() dto: CreateBranchDto,
  ): Promise<Branch> {
    return this.branchService.create(customerId, dto);
  }

  @Put(':id')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.update(customerId, id, dto);
  }

  @Delete(':id')
  remove(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Branch> {
    return this.branchService.delete(customerId, id);
  }
}
