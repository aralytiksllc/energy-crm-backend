// External

// Internal
import { type Contact } from '@/common/prisma/prisma.client';

export class ContactUpdatedEvent {
  constructor(public readonly contact: Contact) {}
}
