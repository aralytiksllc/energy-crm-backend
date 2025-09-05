// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyContractsPipe extends FindManyPipe<
  Prisma.ContractWhereInput,
  Prisma.ContractOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'effectiveDate',
        'supplyStartDate',
        'initialTermYears',
        'maturityDate',
        'renewalTermYears',
        'contractQuantity',
        'pricePerMwh',
        'includesNetworkTariffs',
        'includesVat',
        'paymentTermsDays',
        'securityDepositAmount',
        'terminationNoticeDays',
        'earlyTerminationFee',
        'disputeResolutionMethod',
        'forecastDeadlineDaysBeforeMonth',
        'customerId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
