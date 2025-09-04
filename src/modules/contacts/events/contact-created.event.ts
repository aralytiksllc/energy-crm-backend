// External

// Internal
import { type Contact } from '@/common/prisma/prisma.client';

export class ContactCreatedEvent {
  constructor(public readonly contact: Contact) {}
}
