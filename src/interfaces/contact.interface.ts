import { IBase } from './base.interface';
import { IUser } from './user.interface';

export interface IContact extends IBase {
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
  notes?: string;
  contactableType: string;
  contactableId: number;
  createdBy?: IUser;
  updatedBy?: IUser;
}
