import { AddressType } from '../enums/address-type.enum';
import { IBase } from './base.interface';
import { IUser } from './user.interface';

export interface IAddress extends IBase {
  street: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  addressType: AddressType;
  addressableType: string;
  addressableId: number;
  createdBy?: IUser;
  updatedBy?: IUser;
}
