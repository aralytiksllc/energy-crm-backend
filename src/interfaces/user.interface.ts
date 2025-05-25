import { IBase } from './base.interface';

export interface IUser extends IBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Nullable<Date>;
  dateOfJoining: Nullable<Date>;
  settings: Nullable<Record<string, unknown>>;
  notes: Nullable<string>;
  isActive: boolean;
  createdById: number;
  updatedById: number;
  createdBy?: IUser;
  updatedBy?: IUser;
}
