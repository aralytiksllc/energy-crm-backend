// External

// Internal
import { type MeteringPoint } from '@/prisma/prisma.client';

export class MeteringPointDeletedEvent {
  constructor(public readonly meteringPoint: MeteringPoint) {}
}
