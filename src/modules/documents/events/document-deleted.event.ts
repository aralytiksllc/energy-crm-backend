// External

// Internal
import { type Document } from '@/common/prisma/prisma.client';

export class DocumentDeletedEvent {
  constructor(public readonly document: Document) {}
}
