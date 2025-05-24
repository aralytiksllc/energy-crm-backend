import {
  Table,
  Model,
  Column,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { IAddress } from '../interfaces/address.interface';
import { AddressType } from '../enums/address-type.enum';

@Table({
  tableName: 'addresses',
  timestamps: true,
})
export class Address
  extends Model<InferAttributes<Address>, InferCreationAttributes<Address>>
  implements IAddress
{
  @Column(DataType.STRING)
  street: string;

  @AllowNull
  @Column(DataType.STRING)
  streetTwo: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  country: string;

  @Column(DataType.STRING)
  postalCode: string;

  @Default(AddressType.BOTH)
  @Column(DataType.ENUM(...Object.values(AddressType)))
  addressType: AddressType;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isPrimary: boolean;

  @Column(DataType.STRING)
  addressableType: string;

  @Column(DataType.INTEGER)
  addressableId: number;
}
