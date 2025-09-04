// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateBranchHandler } from './commands/create-branch.handler';
import { DeleteBranchHandler } from './commands/delete-branch.handler';
import { FindManyBranchsPipe } from './pipes/find-many-branchs.pipe';
import { FindManyBranchsHandler } from './queries/find-many-branchs.handler';
import { FindOneBranchHandler } from './queries/find-one-branch.handler';
import { UpdateBranchHandler } from './commands/update-branch.handler';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [CqrsModule],
  controllers: [BranchController],
  providers: [
    FindManyBranchsPipe,
    FindManyBranchsHandler,
    FindOneBranchHandler,
    CreateBranchHandler,
    UpdateBranchHandler,
    DeleteBranchHandler,
    BranchService,
  ],
  exports: [BranchService],
})
export class BranchModule {}
