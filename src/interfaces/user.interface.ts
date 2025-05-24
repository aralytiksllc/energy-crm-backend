import { IBase } from './base.interface';

export interface IUser extends IBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  settings?: Record<string, unknown>;
  notes?: string;
  isActive: boolean;
  createdBy?: IUser;
  updatedBy?: IUser;
}
