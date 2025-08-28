// External

// Internal
import type { Contact } from '@/prisma/prisma.client';

export class ContactUpdatedEvent {
  constructor(public readonly contact: Contact) {}
}
