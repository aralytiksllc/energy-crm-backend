import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../common/cqrs/base.model';

@Table
export class PasswordReset extends BaseModel<PasswordReset> {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  token: string;

  @Column(DataType.DATE)
  expiresAt: Date;
}
