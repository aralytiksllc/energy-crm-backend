// External
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Internal
import { PrismaModule } from './common/prisma/prisma.module';
import { prismaExtension } from './common/prisma/prisma.extension';
import { EmailModule } from './common/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { CustomerModule } from './modules/customers/customer.module';
import { BranchModule } from './modules/branches/branch.module';
import { ContactModule } from './modules/contacts/contact.module';
import { MeteringPointModule } from './modules/metering-points/metering-point.module';
import { ConsumptionModule } from './modules/consumptions/consumption.module';
import { ContractModule } from './modules/contracts/contract.module';
import { DocumentModule } from './modules/documents/document.module';
import { AzureStorageModule } from './common/azure-storage';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule.forRootAsync({
      name: 'prisma',
      isGlobal: true,
      useFactory: () => prismaExtension,
    }),
    AzureStorageModule.withConfigAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connectionString: config.get<string>(
          'AZURE_STORAGE_CONNECTION_STRING',
        )!,
        accountName: config.get<string>('AZURE_STORAGE_ACCOUNT_NAME')!,
        containerName: config.get<string>('AZURE_STORAGE_CONTAINER_NAME')!,
      }),
    }),
    EmailModule,
    AuthModule,
    UserModule,
    RoleModule,
    CustomerModule,
    BranchModule,
    ContactModule,
    MeteringPointModule,
    ConsumptionModule,
    ContractModule,
    DocumentModule,
  ],
})
export class AppModule {}
