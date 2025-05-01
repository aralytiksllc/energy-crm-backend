import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Auditable {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdById: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  updatedById: string | null;
}
