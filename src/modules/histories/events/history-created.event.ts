// External dependencies
import { History } from '@prisma/client';

// Internal dependencies

export class HistoryCreatedEvent {
  constructor(public readonly history: History) {}
}
