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
  StreamableFile,
} from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Contract } from '@/common/prisma/prisma.client';
import { CreateContractDto } from './dtos/create-contract.dto';
import { FindManyContractsDto } from './dtos/find-many-contracts.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { FindManyContractsPipe } from './pipes/find-many-contracts.pipe';
import { ContractService } from './contract.service';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findMany(
    @Query(FindManyContractsPipe) dto: FindManyContractsDto,
  ): Promise<Paginate<Contract>> {
    return this.contractService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateContractDto): Promise<Contract> {
    return this.contractService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateContractDto,
  ): Promise<Contract> {
    return this.contractService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Contract> {
    return this.contractService.delete(id);
  }

  @Get(':id/pdf')
  async pdf(@Param('id', ParseIntPipe) id: number): Promise<StreamableFile> {
    const buffer = await this.contractService.generatePdf(id);
    return new StreamableFile(buffer, {
      disposition: `inline; filename="contract-${id}.pdf"`,
      type: 'application/pdf',
    });
  }
}
