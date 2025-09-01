// External

// Internal
import type { Document } from '@/prisma/prisma.client';

export class DocumentCreatedEvent {
  constructor(public readonly document: Document) {}
}
