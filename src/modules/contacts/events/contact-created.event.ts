// External

// Internal
import type { Contact } from '@/prisma/prisma.client';

export class ContactCreatedEvent {
  constructor(public readonly contact: Contact) {}
}
