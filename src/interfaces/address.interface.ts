import { AddressType } from '../enums/address-type.enum';

export interface IAddress {
  id?: number;
  street: string;
  streetTwo?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  addressType: AddressType;
  isPrimary: boolean;
  addressableType: string;
  addressableId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
