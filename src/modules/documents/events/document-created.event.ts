// External

// Internal
import type { Document } from '@/prisma/prisma.service';

export class DocumentCreatedEvent {
  constructor(public readonly document: Document) {}
}
