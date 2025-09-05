// External

// Internal
import { type Document } from '@/common/prisma/prisma.client';

export class DocumentUpdatedEvent {
  constructor(public readonly document: Document) {}
}
