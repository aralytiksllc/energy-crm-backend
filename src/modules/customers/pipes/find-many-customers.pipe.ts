// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyCustomersPipe extends FindManyPipe<
  Prisma.CustomerWhereInput,
  Prisma.CustomerOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'name',
        'registeredAddress',
        'legalNoticeEmail',
        'phone',
        'defaultOperationalEmail',
        'defaultEscalationEmail',
        'registrationNumber',
        'businessType',
        'registrationDate',
        'registeredCapital',
        'status',
        'mainActivity',
        'legalId',
        'legalStatus',
        'code',
        'type',
        'description',
        'cityRegion',
        'authorizedRepresentative',
        'role',
        'sectorPrimary',
        'sectorSecondary',
        'preferredCommunicationLanguage',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
