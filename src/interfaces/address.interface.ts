import { AddressType } from '../enums/address-type.enum';
import { IBase } from './base.interface';
import { IUser } from './user.interface';

export interface IAddress extends IBase {
  street: string;
  streetTwo: Nullable<string>;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  addressType: AddressType;
  isPrimary: boolean;
  addressableType: string;
  addressableId: number;
  createdById: number;
  updatedById: number;
  createdBy: IUser;
  updatedBy: IUser;
}
