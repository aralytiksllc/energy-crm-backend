import { Injectable } from '@nestjs/common';
import { IAuditableProvider } from '@/common/auditable/auditable.interfaces';

@Injectable()
export class AuditableUserService implements IAuditableProvider {
  async getCurrentUserId(): Promise<string | null> {
    // return null;
    return '3d14c119-d80d-475b-9907-554f64717cfe';
  }
}
