import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  Default,
  IsEmail,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { IContact } from '../interfaces/contact.interface';

@Table({
  tableName: 'contacts',
  timestamps: true,
})
export class Contact
  extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>>
  implements IContact
{
  @Column(DataType.STRING)
  @AllowNull(false)
  firstName: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  lastName: string;

  @Column(DataType.STRING)
  @AllowNull(true)
  title: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  @IsEmail
  email: string;

  @Column(DataType.STRING)
  @AllowNull(true)
  phone: string;

  @Column(DataType.BOOLEAN)
  @Default(true)
  isPrimary: boolean;

  @Column(DataType.TEXT)
  @AllowNull(true)
  notes: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  contactableType: string;

  @Column(DataType.INTEGER)
  @AllowNull(false)
  contactableId: number;
}
