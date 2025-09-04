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
import { type Branch } from '@/common/prisma/prisma.client';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { FindManyBranchsDto } from './dtos/find-many-branchs.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';
import { FindManyBranchsPipe } from './pipes/find-many-branchs.pipe';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  findMany(
    @Query(FindManyBranchsPipe) dto: FindManyBranchsDto,
  ): Promise<Paginate<Branch>> {
    return this.branchService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Branch> {
    return this.branchService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Branch> {
    return this.branchService.delete(id);
  }
}
