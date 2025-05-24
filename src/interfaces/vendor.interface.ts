import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { IProduct } from './product.interface';

export interface IVendor extends IBase {
  name: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  isActive: boolean;
  settings?: Record<string, unknown>;
  products?: IProduct[];
  createdBy?: IUser;
  updatedBy?: IUser;
}
