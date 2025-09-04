// External

// Internal
import type { Consumption } from '@/prisma/prisma.service';

export class ConsumptionCreatedEvent {
  constructor(public readonly consumption: any) {}
}
