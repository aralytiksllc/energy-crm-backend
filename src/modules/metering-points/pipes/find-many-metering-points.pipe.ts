// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

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
        'status',
        'utilityProvider',
        'gpsCoordinates',
        'registeredAddress',
        'operationalStatus',
        'installationDate',
        'contractEndDate',
        'connectionType',
        'branchId',
        'contactId',
      ],
      ['branch.customerId'],
      [{ id: 'desc' }],
    );
  }
}
