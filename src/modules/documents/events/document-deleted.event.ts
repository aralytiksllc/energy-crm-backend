// External

// Internal
import type { Document } from '@/prisma/prisma.service';

export class DocumentDeletedEvent {
  constructor(public readonly document: Document) {}
}
