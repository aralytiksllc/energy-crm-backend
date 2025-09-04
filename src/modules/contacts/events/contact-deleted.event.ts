// External

// Internal
import type { Contact } from '@/prisma/prisma.service';

export class ContactDeletedEvent {
  constructor(public readonly contact: Contact) {}
}
