import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@/common/cqrs/base.repository';
import { PasswordReset } from '@/entities/password-reset.entity';

@Injectable()
export class PasswordResetsRepository extends BaseRepository<PasswordReset> {
  constructor(dataSource: DataSource) {
    super(PasswordReset, dataSource);
  }
}
