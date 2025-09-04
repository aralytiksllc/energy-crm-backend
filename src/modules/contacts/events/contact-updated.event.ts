// External

// Internal
import type { Contact } from '@/prisma/prisma.service';

export class ContactUpdatedEvent {
  constructor(public readonly contact: Contact) {}
}
