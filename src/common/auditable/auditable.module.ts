import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AUDITABLE_PROVIDER } from './auditable.constants';
import { AuditableSubscriber } from './auditable.subscriber';
import { IAuditableProvider } from './auditable.interfaces';

@Module({})
export class AuditableModule {
  static forProvider(provider: Type<IAuditableProvider>): DynamicModule {
    const auditableProvider: Provider = {
      provide: AUDITABLE_PROVIDER,
      useClass: provider,
    };

    const subscriberProvider: Provider = {
      provide: AuditableSubscriber,
      inject: [AUDITABLE_PROVIDER, DataSource],
      useFactory: (auditable: IAuditableProvider, dataSource: DataSource) => {
        const subscriber = new AuditableSubscriber(auditable);
        dataSource.subscribers.push(subscriber);
        return subscriber;
      },
    };

    return {
      module: AuditableModule,
      providers: [auditableProvider, subscriberProvider],
      exports: [AUDITABLE_PROVIDER],
    };
  }
}
