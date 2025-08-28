// External
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Internal
import { EmailModule } from './common/email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { CustomerModule } from './modules/customers/customer.module';
import { BranchModule } from './modules/branches/branch.module';
import { ContactModule } from './modules/contacts/contact.module';
import { MeteringPointModule } from './modules/metering-points/metering-point.module';
import { ConsumptionModule } from './modules/consumptions/consumption.module';
import { ContractModule } from './modules/contracts/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
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
  ],
})
export class AppModule {}
