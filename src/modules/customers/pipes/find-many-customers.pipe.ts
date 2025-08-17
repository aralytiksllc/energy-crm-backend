// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import type { Prisma } from '@/prisma/prisma.client';

@Injectable()
export class FindManyCustomersPipe extends FindManyPipe<
  Prisma.CustomerWhereInput,
  Prisma.CustomerOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'companyName',
        'registeredAddress',
        'legalNoticeEmail',
        'phone',
        'defaultOperationalEmail',
        'defaultEscalationEmail',
        'registrationNumber',
        'businessType',
        'registrationDate',
        'registeredCapital',
        'companyStatus',
        'mainActivity',
        'legalId',
        'legalStatus',
        'companyCode',
        'companyType',
        'companyDescription',
        'cityRegion',
        'authorizedRepresentative',
        'companyRole',
        'sectorPrimary',
        'sectorSecondary',
        'clientStatus',
        'preferredCommunicationLanguage',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
