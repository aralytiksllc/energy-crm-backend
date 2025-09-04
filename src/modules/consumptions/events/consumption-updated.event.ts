// External

// Internal
import type { Consumption } from '@/prisma/prisma.service';

export class ConsumptionUpdatedEvent {
  constructor(public readonly consumption: Consumption) {}
}
