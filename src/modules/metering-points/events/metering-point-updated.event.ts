// External

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';

export class MeteringPointUpdatedEvent {
  constructor(public readonly meteringPoint: MeteringPoint) {}
}
