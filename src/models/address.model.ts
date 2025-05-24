import {
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { AddressType } from '@/enums/address-type.enum';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table
export class Address extends BaseModel<Address> {
  @Column(DataType.STRING)
  street: string;

  @AllowNull
  @Column(DataType.STRING)
  street2?: string;

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

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
