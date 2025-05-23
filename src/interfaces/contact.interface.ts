export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
  notes?: string;
  contactableType: string;
  contactableId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
