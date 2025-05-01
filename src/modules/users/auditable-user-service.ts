import { Injectable } from '@nestjs/common';
import { IAuditableProvider } from '../../common/auditable/auditable.interfaces';

@Injectable()
export class AuditableUserService implements IAuditableProvider {
  async getCurrentUserId(): Promise<string | null> {
    return '8cb190f7-4910-4861-9e16-6207c674a7f0';
  }
}
