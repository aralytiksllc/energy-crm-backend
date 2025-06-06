import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/cqrs/base.entity';
import { HistoryAction } from '../enums/history-action.enum';

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
