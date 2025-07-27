// External dependencies

// Internal dependencies
import { History } from '../entities/history.entity';

export class HistoryCreatedEvent {
  constructor(public readonly history: History) {}
}
