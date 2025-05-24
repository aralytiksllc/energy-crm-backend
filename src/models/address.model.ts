import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AddressType } from '../enums/address-type.enum';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table
export class Address extends BaseModel<Address> {
  @Column(DataType.STRING)
  street: string;

  @AllowNull
  @Column(DataType.STRING)
  street2: Nullable<string>;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  country: string;

  @Column(DataType.STRING)
  zipCode: string;

  @Column(DataType.ENUM(...Object.values(AddressType)))
  addressType: AddressType;

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
  createdBy: User;

  @BelongsTo(() => User)
  updatedBy: User;
}
