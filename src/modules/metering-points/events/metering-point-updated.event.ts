// External

// Internal
import { type MeteringPoint } from '@/common/prisma/prisma.client';

export class MeteringPointUpdatedEvent {
  constructor(public readonly meteringPoint: MeteringPoint) {}
}
