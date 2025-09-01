import { createParamDecorator } from '@nestjs/common';

export const AzureStorageCredentials = createParamDecorator(() => {
  return {
    sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
    accountName: process.env['AZURE_STORAGE_ACCOUNT'],
  };
});
