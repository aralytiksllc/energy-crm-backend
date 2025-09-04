// External

// Internal
import type { Document } from '@/prisma/prisma.service';

export class DocumentUpdatedEvent {
  constructor(public readonly document: Document) {}
}
