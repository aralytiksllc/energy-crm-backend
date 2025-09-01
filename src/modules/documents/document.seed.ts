// External
import { Injectable, OnModuleInit } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DocumentSeed implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {}
}
