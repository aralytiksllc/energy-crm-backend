// External

// Internal
import { type MeteringPoint } from '@/prisma/prisma.client';

export class MeteringPointCreatedEvent {
  constructor(public readonly meteringPoint: MeteringPoint) {}
}
