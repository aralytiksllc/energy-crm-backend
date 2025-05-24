import {
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { AddressType } from '@/enums/address-type.enum';
import { BaseModel } from './base.model';

@Table({ tableName: 'addresses' })
export class Address extends BaseModel<Address> {
  @Column(DataType.STRING)
  street: string;

  @AllowNull
  @Column(DataType.STRING)
  streetTwo?: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  country: string;

  @Column(DataType.STRING)
  postalCode: string;

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
