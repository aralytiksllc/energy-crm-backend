// External dependencies
import { Entity, Property } from '@mikro-orm/postgresql';

// Internal dependencies
import { BaseEntity } from '@/common/cqrs/base.entity';
import { HistoryAction } from '../enums/history-action.enum';

@Entity({ tableName: 'histories' })
export class History extends BaseEntity {
  @Property({ type: 'enum' })
  action!: HistoryAction;

  @Property()
  entityId!: number;

  @Property()
  entityName!: string;

  @Property({ type: 'json' })
  entityData!: any;
}
