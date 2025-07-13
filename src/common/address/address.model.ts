import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { AddressType } from './address-type.enum';

@Entity()
export abstract class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'varchar', nullable: true })
  streetTwo?: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  postalCode: string;

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.BOTH,
  })
  addressType: AddressType;

  @Column({ type: 'boolean', default: true })
  isPrimary: boolean;

  @Column({ type: 'varchar' })
  addressableType: string;

  @Column({ type: 'int' })
  addressableId: number;
}
