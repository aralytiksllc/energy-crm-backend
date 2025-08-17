// External
import { Injectable, OnModuleInit } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class RoleSeed implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    // Seed roles
    const readAny = await this.prismaService.permission.upsert({
      where: { id: 1 },
      update: { action: 'read', subject: 'User' },
      create: { action: 'read', subject: 'User' },
    });

    const createAny = await this.prismaService.permission.upsert({
      where: { id: 2 },
      update: { action: 'create', subject: 'User' },
      create: { action: 'create', subject: 'User' },
    });

    const updateOwn = await this.prismaService.permission.upsert({
      where: { id: 3 },
      update: {
        action: 'update',
        subject: 'User',
        conditions: { id: '${user.id}' } as any,
      },
      create: {
        action: 'update',
        subject: 'User',
        conditions: { id: '${user.id}' } as any,
      },
    });

    await this.prismaService.role.upsert({
      where: { name: 'MANAGER' },
      create: {
        name: 'MANAGER',
        permissions: {
          connect: [
            { id: readAny.id },
            { id: createAny.id },
            { id: updateOwn.id },
          ],
        },
      },
      update: {
        permissions: {
          set: [{ id: readAny.id }, { id: createAny.id }, { id: updateOwn.id }],
        },
      },
    });
  }
}
