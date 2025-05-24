import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  Default,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Sale } from './sale.model';
import { Contact } from './contact.model';
import { User } from './user.model';

@Table
export class Customer extends BaseModel<Customer> {
  @Unique
  @Column(DataType.STRING)
  name!: string;

  @AllowNull
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull
  @Column(DataType.STRING)
  contactEmail?: string;

  @AllowNull
  @Column(DataType.STRING)
  contactPhone?: string;

  @AllowNull
  @Column(DataType.STRING)
  website?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive?: boolean;

  @AllowNull
  @Column(DataType.JSON)
  settings?: Record<string, any>;

  @HasMany(() => Sale)
  sales?: Sale[];

  @HasMany(() => Contact, {
    foreignKey: 'contactableId',
    constraints: false,
    scope: {
      contactableType: 'customer',
    },
  })
  contacts?: Contact[];

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
