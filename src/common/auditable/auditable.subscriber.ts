import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { IAuditableProvider } from './auditable.interfaces';

@EventSubscriber()
export class AuditableSubscriber
  implements EntitySubscriberInterface<AuditableEntity>
{
  constructor(private readonly auditableProvider: IAuditableProvider) {}

  listenTo() {
    return AuditableEntity;
  }

  async beforeInsert(event: InsertEvent<AuditableEntity>) {
    const userId = await this.auditableProvider.getCurrentUserId();
    if (event.entity && userId) {
      event.entity.createdById = userId;
      event.entity.updatedById = userId;
    }
  }

  async beforeUpdate(event: UpdateEvent<AuditableEntity>) {
    const userId = await this.auditableProvider.getCurrentUserId();
    if (event.entity && userId) {
      event.entity.updatedById = userId;
    }
  }
}
