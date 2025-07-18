// External dependencies
import { Entity, Column } from 'typeorm';

// Internal dependencies
import { BaseEntity } from '@/common/cqrs/base.entity';
import { HistoryAction } from '@/modules/histories/enums/history-action.enum';

@Entity('histories')
export class History extends BaseEntity {
  @Column({ type: 'enum', enum: HistoryAction })
  action: HistoryAction;

  @Column()
  entityId: number;

  @Column()
  entityName: string;

  @Column('jsonb')
  entityData: any;
}
