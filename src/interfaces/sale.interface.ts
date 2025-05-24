import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { ICustomer } from './customer.interface';
import { ISaleItem } from './sale-item.interface';

export interface ISale extends IBase {
  saleNumber: number;
  saleDate: Date;
  notes?: string;

  // Foreign keys
  customerId: number;

  // Relationships
  customer?: ICustomer;
  items?: ISaleItem[];
  createdBy?: IUser;
  updatedBy?: IUser;

  // Virtual fields
  formattedSaleNumber?: string;
}
