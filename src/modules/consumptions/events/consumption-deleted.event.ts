// External

// Internal
import type { Consumption } from '@/prisma/prisma.client';

export class ConsumptionDeletedEvent {
  constructor(public readonly consumption: Consumption) {}
}
