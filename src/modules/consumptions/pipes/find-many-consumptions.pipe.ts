// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import type { Prisma } from '@/prisma/prisma.client';

@Injectable()
export class FindManyConsumptionsPipe extends FindManyPipe<
  Prisma.ConsumptionWhereInput,
  Prisma.ConsumptionOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'timestamp',
        'timeframe',
        'electricityConsumptionKwh',
        'meteringPointId',
        'contractId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
