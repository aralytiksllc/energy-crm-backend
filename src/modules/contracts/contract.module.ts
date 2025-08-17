// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateContractHandler } from './commands/create-contract.handler';
import { DeleteContractHandler } from './commands/delete-contract.handler';
import { FindManyContractsPipe } from './pipes/find-many-contracts.pipe';
import { FindManyContractsHandler } from './queries/find-many-contracts.handler';
import { FindOneContractHandler } from './queries/find-one-contract.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateContractHandler } from './commands/update-contract.handler';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractSeed } from './contract.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ContractController],
  providers: [
    FindManyContractsPipe,
    FindManyContractsHandler,
    FindOneContractHandler,
    CreateContractHandler,
    UpdateContractHandler,
    DeleteContractHandler,
    ContractService,
    ContractSeed,
  ],
  exports: [ContractService],
})
export class ContractModule {}
