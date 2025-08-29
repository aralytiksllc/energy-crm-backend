import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateContractPdfCommand } from './generate-contract-pdf.command';
import { PrismaService } from '@/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';

type ContractForDoc = Prisma.ContractGetPayload<{
  include: { customer: true };
}>;

@CommandHandler(GenerateContractPdfCommand)
export class GenerateContractPdfHandler
  implements ICommandHandler<GenerateContractPdfCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(cmd: GenerateContractPdfCommand): Promise<Buffer> {
    const db = (await this.prisma.contract.findUnique({
      where: { id: cmd.id },
      include: { customer: true },
    })) as ContractForDoc | null;

    if (!db) throw new Error('Contract not found');

    const ctx = this.toTemplateContext(db);

    const tplPath = path.resolve(
      __dirname,
      '../../templates/contract.part1.al.hbs',
    );
    const tplSrc = await fs.readFile(tplPath, 'utf8');
    const html = Handlebars.compile(tplSrc, { noEscape: false })(ctx);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfUint8 = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' },
      });

      const pdfBuffer = Buffer.from(pdfUint8);
      return pdfBuffer;
    } finally {
      await browser.close();
    }
  }

  private toTemplateContext(db: ContractForDoc) {
    const fmt = (d?: Date | null) => (d ? dayjs(d).format('DD.MM.YYYY') : '');
    const money = (v?: Prisma.Decimal | number | null) => {
      if (v == null) return '';
      const n = typeof v === 'number' ? v : Number(v.toString());
      return n.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    return {
      supplier: {
        name: 'Management & Development Associates LLC',
        address: 'Xheladin Hana, A17, H1, #4, Prishtinë, Kosovë 10000',
        phone: '+383 45 999 910',
        email: 'info@mda.al',
        licenseNo: 'ZRRE/LI_103/25',
        regNo: '810491952',
      },
      customer: {
        id: db.customer?.id,
        name: (db.customer as any)?.name,
        address: (db.customer as any)?.address,
        regNo: (db.customer as any)?.registryNumber,
        email: (db.customer as any)?.email,
        phone: (db.customer as any)?.phone,
      },
      contract: {
        number: db.contractNumber,
        effectiveDate: fmt(db.effectiveDate),
        supplyStartDate: fmt(db.supplyStartDate),
        maturityDate: fmt(db.maturityDate),
        initialTermYears: db.initialTermYears ?? '',
        renewalTermYears: db.renewalTermYears ?? '',
        quantity: db.contractQuantity ?? '',
        pricePerMwh: money(db.pricePerMwh as any),
        includesNetworkTariffs: !!db.includesNetworkTariffs,
        includesVat: !!db.includesVat,
        paymentTermsDays: db.paymentTermsDays ?? '',
        securityDepositAmount: money(db.securityDepositAmount as any),
        terminationNoticeDays: db.terminationNoticeDays ?? '',
        earlyTerminationFee: db.earlyTerminationFee ?? '',
        disputeResolutionMethod: db.disputeResolutionMethod ?? '',
        forecastDeadlineDaysBeforeMonth:
          db.forecastDeadlineDaysBeforeMonth ?? '',
      },
    };
  }
}
