// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyDocumentsPipe extends FindManyPipe<
  Prisma.DocumentWhereInput,
  Prisma.DocumentOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'name',
        'originalName',
        'mimeType',
        'size',
        'path',
        'description',
        'documentType',
        'customerId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
