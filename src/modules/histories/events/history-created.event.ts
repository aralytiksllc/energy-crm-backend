// External dependencies

// Internal dependencies
import { History } from '@/modules/histories/entities/history.entity';

export class HistoryCreatedEvent {
  constructor(public readonly history: History) {}
}
