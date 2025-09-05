// External

// Internal
import { type Document } from '@/common/prisma/prisma.client';

export class DocumentCreatedEvent {
  constructor(public readonly document: Document) {}
}
