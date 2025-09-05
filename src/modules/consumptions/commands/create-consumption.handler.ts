import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@/prisma/prisma.service';
import { AzureStorageService } from '@/common/azure-storage';
import { CreateConsumptionCommand } from './create-consumption.command';
import { ConsumptionCreatedEvent } from '../events/consumption-created.event';

@CommandHandler(CreateConsumptionCommand)
export class CreateConsumptionHandler
  implements ICommandHandler<CreateConsumptionCommand>
{
  private readonly CHUNK = 200;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly azureStorage: AzureStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateConsumptionCommand) {
    const { file, dto, rows } = command;

    const { blobName, blobUrl } = await this.azureStorage.upload(file, {
      containerName: 'mda',
    });

    const consumptionFile = await this.prismaService.$transaction(
      async (tx) => {
        const consumptionFile = await tx.consumptionFile.create({
          data: {
            name: blobName,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: blobUrl,
            description: dto.description ?? null,
          },
        });

        for (let i = 0; i < rows.length; i += this.CHUNK) {
          const slice = rows.slice(i, i + this.CHUNK);

          const dataPromise = slice.map((r) => {
            return tx.consumption.upsert({
              where: {
                meteringPointId_timestamp_timeframe: {
                  meteringPointId: dto.meteringPointId,
                  timestamp: r.timestamp,
                  timeframe: r.timeframe,
                },
              },
              update: {
                electricityConsumptionKwh: r.electricityConsumptionKwh,
                contractId: dto.contractId ?? null,
                consumptionFileId: consumptionFile.id,
              },
              create: {
                timestamp: r.timestamp,
                timeframe: r.timeframe,
                electricityConsumptionKwh: r.electricityConsumptionKwh,
                meteringPointId: dto.meteringPointId,
                contractId: dto.contractId ?? null,
                consumptionFileId: consumptionFile.id,
              },
            });
          });

          await Promise.all(dataPromise);
        }

        return consumptionFile;
      },
    );

    this.eventBus.publish(new ConsumptionCreatedEvent(consumptionFile));

    return consumptionFile;
  }
}
