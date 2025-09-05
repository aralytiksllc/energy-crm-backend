// External

// Internal

export interface AzureStorageOptions {
  accountName: string;

  accountKey: string;

  containerName: string;

  sasExpiresInSeconds?: number;
}
