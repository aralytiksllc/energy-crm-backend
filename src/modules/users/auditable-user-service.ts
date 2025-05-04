import { Injectable } from '@nestjs/common';
import { IAuditableProvider } from '../../common/auditable/auditable.interfaces';

@Injectable()
export class AuditableUserService implements IAuditableProvider {
  async getCurrentUserId(): Promise<string | null> {
    return '15b23c27-2837-4251-9428-2b0074e8606b';
  }
}
