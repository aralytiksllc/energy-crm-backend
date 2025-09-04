// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import type { Prisma } from '@/prisma/prisma.service';

@Injectable()
export class FindManyMeteringPointsPipe extends FindManyPipe<
  Prisma.MeteringPointWhereInput,
  Prisma.MeteringPointOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'deliveryAddress',
        'locationAddress',
        'cityOrLocality',
        'country',
        'tariffGroup',
        'technicalContactName',
        'technicalContactTitle',
        'technicalContactPhone',
        'technicalContactEmail',
        'contractedCapacityValue',
        'contractedCapacityUnit',
        'voltageLevel',
        'meterType',
        'connectionSpecs',
        'agreedMaxDemandKw',
        'notes',
        'meteringPointStatus',
        'utilityProvider',
        'gpsCoordinates',
        'registeredAddress',
        'operationalStatus',
        'installationDate',
        'contractEndDate',
        'branchId',
      ],
      ['branch.customerId'],
      [{ id: 'desc' }],
    );
  }
}
