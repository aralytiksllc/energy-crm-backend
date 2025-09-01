// External

// Internal
import type { ConsumptionFile } from '@/prisma/prisma.client';

export class ConsumptionDeletedEvent {
  constructor(public readonly consumption: ConsumptionFile) {}
}
