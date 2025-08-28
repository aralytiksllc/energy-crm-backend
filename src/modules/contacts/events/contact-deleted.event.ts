// External

// Internal
import type { Contact } from '@/prisma/prisma.client';

export class ContactDeletedEvent {
  constructor(public readonly contact: Contact) {}
}
