import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { ISale } from './sale.interface';
import { IProduct } from './product.interface';

export interface ISaleItem extends IBase {
  quantity: number;
  price: number;
  discount: number;
  amount: number;

  // Foreign keys
  saleId: number;
  productId: number;

  // Relationships
  sale?: ISale;
  product?: IProduct;
  createdBy?: IUser;
  updatedBy?: IUser;
}
