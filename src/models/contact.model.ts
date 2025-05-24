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
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @AllowNull
  @Column(DataType.STRING)
  title: string;

  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull
  @Column(DataType.STRING)
  phone: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isPrimary: boolean;

  @AllowNull
  @Column(DataType.TEXT)
  notes: string;

  @Column(DataType.STRING)
  contactableType: string;

  @Column(DataType.INTEGER)
  contactableId: number;
}
