import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AZURE_STORAGE_MODULE_OPTIONS } from './azure-storage.constant';
import { AzureStorageService } from './azure-storage.service';
import { AzureStorageMulter } from './azure-storage.middleware';
import type {
  AzureStorageOptions,
  AzureStorageAsyncOptions,
  AzureStorageOptionsFactory,
} from './azure-storage.interfaces';

const PUBLIC_PROVIDERS = [AzureStorageService, AzureStorageMulter];

@Global()
@Module({
  providers: [...PUBLIC_PROVIDERS],
  exports: [...PUBLIC_PROVIDERS],
})
export class AzureStorageModule {
  static withConfig(options: AzureStorageOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: AZURE_STORAGE_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: AzureStorageModule,
      providers: [optionsProvider, ...PUBLIC_PROVIDERS],
      exports: [...PUBLIC_PROVIDERS],
    };
  }

  static withConfigAsync(options: AzureStorageAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: AzureStorageModule,
      providers: [...asyncProviders, ...PUBLIC_PROVIDERS],
      exports: [...PUBLIC_PROVIDERS],
    };
  }

  private static createAsyncProviders(
    options: AzureStorageAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: AZURE_STORAGE_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    const useClassOrExisting = options.useClass || options.useExisting;

    if (!useClassOrExisting) {
      throw new Error(
        'withConfigAsync requires useFactory, useClass, or useExisting.',
      );
    }

    const providers: Provider[] = [];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    providers.push({
      provide: AZURE_STORAGE_MODULE_OPTIONS,
      useFactory: async (factory: AzureStorageOptionsFactory) =>
        factory.createAzureStorageOptions(),
      inject: [useClassOrExisting],
    });

    return providers;
  }
}
