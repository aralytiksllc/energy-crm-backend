// External
import { Module, DynamicModule } from '@nestjs/common';

// Internal
import { AzureStorageService } from './azure-storage.service';
import { AZURE_STORAGE_MODULE_OPTIONS } from './azure-storage.constant';
import { type AzureStorageOptions } from './azure-storage.interfaces';

@Module({})
export class AzureStorageModule {
  static forRoot(options: AzureStorageOptions): DynamicModule {
    return {
      global: true,
      module: AzureStorageModule,
      providers: [
        { provide: AZURE_STORAGE_MODULE_OPTIONS, useValue: options },
        AzureStorageService,
      ],
      exports: [AzureStorageService],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    useFactory: (
      ...args: any[]
    ) => AzureStorageOptions | Promise<AzureStorageOptions>;
    inject?: any[];
  }): DynamicModule {
    return {
      global: true,
      module: AzureStorageModule,
      imports: options.imports || [],
      providers: [
        {
          provide: AZURE_STORAGE_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        AzureStorageService,
      ],
      exports: [AzureStorageService],
    };
  }
}
