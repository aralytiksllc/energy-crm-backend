import { IUser } from './user.interface';

export interface IBase {
  id: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Foreign keys
  createdById?: number;
  updatedById?: number;
}
