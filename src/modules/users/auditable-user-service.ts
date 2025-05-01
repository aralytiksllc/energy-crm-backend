import { Injectable } from '@nestjs/common';
import { IAuditableProvider } from '../../common/auditable/auditable.interfaces';

@Injectable()
export class AuditableUserService implements IAuditableProvider {
  async getCurrentUserId(): Promise<string | null> {
    return '5a860531-e405-4dc7-b59a-cce1055c653e';
  }
}
