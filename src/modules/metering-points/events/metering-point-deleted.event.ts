// External

// Internal
import { type MeteringPoint } from '@/common/prisma/prisma.client';

export class MeteringPointDeletedEvent {
  constructor(public readonly meteringPoint: MeteringPoint) {}
}
