// External

// Internal
import type { Consumption } from '@/prisma/prisma.client';

export class ConsumptionCreatedEvent {
  constructor(public readonly consumption: Consumption) {}
}
