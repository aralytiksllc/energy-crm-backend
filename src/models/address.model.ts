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
  @AllowNull(false)
  street: string;

  @Column(DataType.STRING)
  @AllowNull(true)
  streetTwo: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  city: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  state: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  country: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  postalCode: string;

  @Column(DataType.ENUM(...Object.values(AddressType)))
  @Default(AddressType.BOTH)
  addressType: AddressType;

  @Column(DataType.BOOLEAN)
  @Default(true)
  isPrimary: boolean;

  @Column(DataType.STRING)
  @AllowNull(false)
  addressableType: string;

  @Column(DataType.INTEGER)
  @AllowNull(false)
  addressableId: number;
}
