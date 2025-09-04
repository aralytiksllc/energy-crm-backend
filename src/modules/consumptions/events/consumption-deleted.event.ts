// External

// Internal
import type { ConsumptionFile } from '@/prisma/prisma.service';

export class ConsumptionDeletedEvent {
  constructor(public readonly consumption: ConsumptionFile) {}
}
