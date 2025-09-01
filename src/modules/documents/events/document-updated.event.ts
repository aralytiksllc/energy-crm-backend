// External

// Internal
import type { Document } from '@/prisma/prisma.client';

export class DocumentUpdatedEvent {
  constructor(public readonly document: Document) {}
}
