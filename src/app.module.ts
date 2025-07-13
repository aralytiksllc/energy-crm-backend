// External dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Internal dependencies
import { PrismaService } from '@/common/prisma/prisma.service';
import { EmailModule } from '@/common/email/email.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    EmailModule,

    AuthModule,

    UserModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
