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
import { GenerateContractPdfHandler } from './commands/generate-contract-pdf.handler';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractSeed } from './contract.seed';

import { PuppeteerService } from './commands/puppeteer.service';

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
    GenerateContractPdfHandler,
    ContractService,
    ContractSeed,
    PuppeteerService,
  ],
  exports: [ContractService],
})
export class ContractModule {}
