import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Sale } from '@/modules/sales/models/sale.model';
import { Contact } from '@/models/contact.model';

@Table({ tableName: 'customers' })
export class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
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
      contactableType: 'customer'
    }
  })
  contacts?: Contact[];
}
