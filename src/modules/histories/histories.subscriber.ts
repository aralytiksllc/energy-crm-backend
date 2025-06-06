import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  SoftRemoveEvent,
  RecoverEvent,
  DataSource,
  EntityMetadata,
  ObjectLiteral,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { BaseEntity } from '@/common/cqrs/base.entity';
import { HistoryAction } from './enums/history-action.enum';
import { CreateHistoryDto } from './dtos/create-history.dto';
import { HistoriesService } from './histories.service';

export abstract class HistoriesSubscriber<TEntity extends BaseEntity>
  implements EntitySubscriberInterface<TEntity>
{
  constructor(
    @InjectDataSource() dataSource: DataSource,
    protected readonly clsService: ClsService,
    protected readonly historiesService: HistoriesService,
  ) {
    dataSource.subscribers.push(this);
  }

  abstract listenTo(): Function;

  afterInsert(event: InsertEvent<TEntity>): void {
    this.save(HistoryAction.Create, event.entity, event.metadata);
  }

  afterUpdate(event: UpdateEvent<TEntity>): void {
    this.save(HistoryAction.Update, event.entity, event.metadata);
  }

  afterRemove(event: RemoveEvent<TEntity>): void {
    this.save(HistoryAction.Delete, event.databaseEntity, event.metadata);
  }

  afterSoftRemove(event: SoftRemoveEvent<TEntity>): void {
    this.save(HistoryAction.SoftDelete, event.databaseEntity, event.metadata);
  }

  afterRecover(event: RecoverEvent<TEntity>): void {
    this.save(HistoryAction.Recover, event.entity, event.metadata);
  }

  private save(
    action: HistoryAction,
    entity?: ObjectLiteral,
    metadata?: EntityMetadata,
  ): void {
    if (entity && metadata) {
      const dto = new CreateHistoryDto();

      dto.action = action;

      dto.entityId = entity.id;

      dto.entityName = metadata.tableName;

      dto.entityData = entity;

      dto.createdById = this.clsService.get('userId');

      this.historiesService.create(dto);
    }
  }
}
