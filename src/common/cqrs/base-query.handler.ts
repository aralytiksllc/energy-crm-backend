import { ModelStatic } from 'sequelize';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { ForbiddenException } from '@nestjs/common';
import { CurrentUserService } from '@/common/current-user';
import { BaseModel } from '@/common/cqrs/base.model';
import { Query } from '@/common/query';
import { Operator } from '@/common/query/query.enums';
import { Paging } from '@/common/paged';

export abstract class BaseCommandHandler<
  TModel extends BaseModel<TModel>,
  TQuery extends IQuery = IQuery,
> implements IQueryHandler<IQuery>
{
  protected constructor(
    protected readonly model: ModelStatic<TModel>,
    protected readonly currentUser: CurrentUserService,
  ) {}

  abstract execute(command: TQuery): Promise<TModel>;

  protected get subject(): any {
    return this.model.name as any;
  }

  public async findAll(query: Query<TModel>): Promise<Paging<TModel>> {
    const subject = this.subject;

    if (!this.currentUser.canManage(subject)) {
      const currentUserId = this.currentUser.getUserId();
      query.addFilter('createdById', Operator.EQ, currentUserId);
    }

    const findOptions = query.toFindOptions();

    const rows = await this.model.findAndCountAll(findOptions);

    return new Paging(rows.rows, rows.count);
  }

  public async findOne(id: number): Promise<TModel> {
    const record = await this.model.findByPk(id);
    const subject = this.subject;

    if (!this.currentUser.canRead(subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to read ${subject} with ID ${id}.`,
      );
    }

    return record!;
  }
}
