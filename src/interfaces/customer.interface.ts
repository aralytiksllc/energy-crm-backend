import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { ISale } from './sale.interface';
import { IContact } from './contact.interface';

export interface ICustomer extends IBase {
  name: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  isActive: boolean;
  settings?: Record<string, unknown>;

  // Relationships
  sales?: ISale[];
  contacts?: IContact[];
  createdBy?: IUser;
  updatedBy?: IUser;
}
