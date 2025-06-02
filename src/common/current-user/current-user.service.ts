import { Injectable } from '@nestjs/common';

export enum Actions {
  Manage = 'manage',
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Destroy = 'destroy',
}

@Injectable()
export class CurrentUserService {
  private userId = 1; // default test user

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public getUserId(): number {
    return this.userId;
  }

  public canManage(subject: any): boolean {
    return true;
  }

  public canRead(subject: any, record: any): boolean {
    return true;
  }

  public canCreate(subject: any): boolean {
    return true;
  }

  public canUpdate(subject: any, record: any): boolean {
    return true;
  }

  public canDestroy(subject: any, record: any): boolean {
    return true;
  }
}
