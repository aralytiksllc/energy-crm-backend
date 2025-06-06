import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { HistoryAction } from '../enums/history-action.enum';

@Entity('histories')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: HistoryAction })
  action: HistoryAction;

  @Column()
  entityId: number;

  @Column()
  entityName: string;

  @Column('jsonb')
  entityData: any;

  @Column({ nullable: true })
  createdById?: number;

  @CreateDateColumn()
  createdAt: Date;
}
