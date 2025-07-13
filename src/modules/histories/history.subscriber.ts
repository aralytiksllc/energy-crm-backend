// External dependencies

// Internal dependencies
import { HistoryService } from './history.service';

export abstract class HistorySubscriber {
  constructor(private readonly historyService: HistoryService) {}
}
