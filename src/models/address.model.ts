import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { AddressType } from '../enums/address-type.enum';
import { BaseModel } from '../common/cqrs/base.model';
import { User } from './user.model';

@Table
export class Address extends BaseModel<Address> {
  @Column(DataType.STRING)
  street: string;

  @AllowNull
  @Column(DataType.STRING)
  streetTwo: Nullable<string>;

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

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdById: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  updatedById: number;

  @BelongsTo(() => User)
  createdBy?: User;

  @BelongsTo(() => User)
  updatedBy?: User;
}
