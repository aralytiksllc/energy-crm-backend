// External

// Internal
import type { Contact } from '@/prisma/prisma.service';

export class ContactCreatedEvent {
  constructor(public readonly contact: Contact) {}
}
