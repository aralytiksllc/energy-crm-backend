import { Injectable } from '@nestjs/common';
import { IAuditableProvider } from '@/common/auditable/auditable.interfaces';

@Injectable()
export class AuditableUserService implements IAuditableProvider {
  async getCurrentUserId(): Promise<string | null> {
    // return null;
    return 'fee20548-7854-48fa-8ecf-87d629e0a1ee';
  }
}
