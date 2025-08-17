// External
import { Injectable, OnModuleInit } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserSeed implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    // Seed departments
    await this.prismaService.department.upsert({
      where: { name: 'FINANCE' },
      create: { name: 'FINANCE' },
      update: {},
    });

    await this.prismaService.department.upsert({
      where: { name: 'IT' },
      create: { name: 'IT' },
      update: {},
    });

    await this.prismaService.department.upsert({
      where: { name: 'HR' },
      create: { name: 'HR' },
      update: {},
    });
  }
}
