import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Auditable } from './auditable.entity';
import { IAuditableProvider } from './auditable.interfaces';

@EventSubscriber()
export class AuditableSubscriber
  implements EntitySubscriberInterface<Auditable>
{
  constructor(private readonly auditableProvider: IAuditableProvider) {}

  listenTo() {
    return Auditable;
  }

  async beforeInsert(event: InsertEvent<Auditable>) {
    const userId = await this.auditableProvider.getCurrentUserId();
    if (event.entity && userId) {
      event.entity.createdById = userId;
      event.entity.updatedById = userId;
    }
  }

  async beforeUpdate(event: UpdateEvent<Auditable>) {
    const userId = await this.auditableProvider.getCurrentUserId();
    if (event.entity && userId) {
      event.entity.updatedById = userId;
    }
  }
}
