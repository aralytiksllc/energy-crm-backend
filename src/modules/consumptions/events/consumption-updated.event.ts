// External

// Internal
import type { Consumption } from '@/prisma/prisma.client';

export class ConsumptionUpdatedEvent {
  constructor(public readonly consumption: Consumption) {}
}
