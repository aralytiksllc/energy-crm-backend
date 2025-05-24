import { ProductUnit } from '../enums/product-unit.enum';
import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { IVendor } from './vendor.interface';

export interface IProduct extends IBase {
  name: string;
  description: string;
  unit: ProductUnit;
  sku: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  upc?: string;
  mpn?: string;
  ean?: string;
  isbn?: string;
  settings?: Record<string, unknown>;
  notes?: string;
  isActive: boolean;

  // Foreign keys
  vendorId: number;

  // Relationships
  vendor?: IVendor;
  createdBy?: IUser;
  updatedBy?: IUser;
}
