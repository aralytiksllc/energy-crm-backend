import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GenerateContractPdfCommand } from './generate-contract-pdf.command';
import { PrismaService } from '@/prisma/prisma.service';
import { PuppeteerService } from './puppeteer.service';
import type { Prisma } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';
import * as dayjs from 'dayjs';

type ContractForDoc = Prisma.ContractGetPayload<{
  include: {
    customer: {
      select: {
        id: true;
        companyName: true;
        registeredAddress: true;
        registrationNumber: true;
        legalNoticeEmail: true;
        defaultOperationalEmail: true;
        defaultEscalationEmail: true;
        phone: true;
        cityRegion: true;
        authorizedRepresentative: true;
        companyRole: true;
        legalStatus: true;
        branches: {
          select: {
            id: true;
            branchName: true;
            meteringPoints: {
              select: {
                id: true;
                deliveryAddress: true;
                cityOrLocality: true;
                country: true;
                tariffGroup: true;
                voltageLevel: true;
                contractedCapacityValue: true;
                contractedCapacityUnit: true;
                notes: true;
                technicalContactName: true;
                technicalContactTitle: true;
                technicalContactPhone: true;
                technicalContactEmail: true;
                meterType: true;
                connectionSpecs: true;
                agreedMaxDemandKw: true;
                operationalStatus: true;
                installationDate: true;
                contractEndDate: true;
              };
            };
          };
        };
        contacts: { select: { email: true; phone: true } };
      };
    };
  };
}>;

@CommandHandler(GenerateContractPdfCommand)
export class GenerateContractPdfHandler
  implements ICommandHandler<GenerateContractPdfCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly pptr: PuppeteerService,
  ) {}

  async execute(
    cmd: GenerateContractPdfCommand,
  ): Promise<{ buffer: Buffer; filename: string }> {
    const db = (await this.prisma.contract.findUnique({
      where: { id: cmd.id },
      include: {
        customer: {
          select: {
            id: true,
            companyName: true,
            registeredAddress: true,
            registrationNumber: true,
            legalNoticeEmail: true,
            defaultOperationalEmail: true,
            defaultEscalationEmail: true,
            phone: true,
            cityRegion: true,
            authorizedRepresentative: true,
            companyRole: true,
            legalStatus: true,
            branches: {
              select: {
                id: true,
                branchName: true,
                meteringPoints: {
                  select: {
                    id: true,
                    deliveryAddress: true,
                    cityOrLocality: true,
                    country: true,
                    tariffGroup: true,
                    voltageLevel: true,
                    contractedCapacityValue: true,
                    contractedCapacityUnit: true,
                    notes: true,
                    technicalContactName: true,
                    technicalContactTitle: true,
                    technicalContactPhone: true,
                    technicalContactEmail: true,
                    meterType: true,
                    connectionSpecs: true,
                    agreedMaxDemandKw: true,
                    operationalStatus: true,
                    installationDate: true,
                    contractEndDate: true,
                  },
                },
              },
            },
            contacts: { select: { email: true, phone: true } },
            contracts: { select: {  } },
          },
        },
      },
    })) as ContractForDoc | null;

    if (!db) throw new NotFoundException('Contract not found');

    const ctx = this.toTemplateContext(db);
    this.validateContext(ctx);

    const contentPath = path.join(
      __dirname,
      '..',
      'templates',
      'contract.content.al.hbs',
    );
    const footerPath = path.join(
      __dirname,
      '..',
      'templates',
      'contract.footer.al.hbs',
    );

    const [contentSrc, footerSrc] = await Promise.all([
      fs.readFile(contentPath, 'utf8'),
      fs.readFile(footerPath, 'utf8'),
    ]);

    const html = Handlebars.compile(contentSrc, { noEscape: false })(ctx);
    const footerTemplate = Handlebars.compile(footerSrc, { noEscape: true })(ctx);

    const browser = await this.pptr.getBrowser();
    const page = await browser.newPage();

    try {
      await page.emulateMediaType('print');
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfUint8 = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>', // no header
        footerTemplate,
        margin: {
          top: '20mm',
          bottom: '24mm', // enough space for footer height
          left: '20mm',
          right: '20mm',
        },
        preferCSSPageSize: true,
      });

      const base = (db as any).contractNumber || `contract-${(db as any).id}`;
      const safe = `${base}`.replace(/[^\w\-]+/g, '_');
      const filename = `${safe}.pdf`;

      return { buffer: Buffer.from(pdfUint8), filename };
    } finally {
      await page.close();
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

    const cust = db.customer;
    const primary = cust?.contacts[0] ?? null;
    const any = cust?.contacts?.find(c => !!c.email || !!c.phone) ?? null;

    // Mandatory fields: still resolve with a simple fallback so we never render undefined strings
    const email =
      cust?.defaultOperationalEmail ||
      cust?.legalNoticeEmail ||
      primary?.email ||
      any?.email ||
      '';
    const phone = cust?.phone || primary?.phone || any?.phone || '';

    // Supplier is dynamic-ready; replace values with your config/db as needed
    const supplier = {
      name: 'Management & Development Associates LLC',
      address: 'Xheladin Hana, A17, H1, #4, Prishtinë, Kosovë 10000',
      phone: '+383 45 999 910',
      email: 'info@mda.al',
      licenseNo: 'ZRRE/LI_103/25',
      regNo: '810491952',
      representativeName: 'Driton Dalipi',
      representativeTitle: 'Drejtor',
      // Add any optional fields used in appendices:
      legalDepartment: 'Legal',
      operationalDepartment: 'Operations',
      operationalContact: 'Operations Desk',
      workingHours: '08:00–16:00',
    };

    return {
      supplier,
      customer: {
        id: cust?.id ?? null,
        companyName: cust?.companyName ?? '',
        registeredAddress: cust?.registeredAddress ?? '',
        registrationNumber: cust?.registrationNumber ?? '',
        legalNoticeEmail: cust?.legalNoticeEmail ?? '',
        defaultOperationalEmail: cust?.defaultOperationalEmail ?? '',
        defaultEscalationEmail: cust?.defaultEscalationEmail ?? '',
        phone,
        cityRegion: cust?.cityRegion ?? '',
        authorizedRepresentative: cust?.authorizedRepresentative ?? '',
        companyRole: cust?.companyRole ?? '',
        legalStatus: cust?.legalStatus ?? '',
        branches: cust?.branches ?? [],
      },
      contract: {
        number: (db as any).contractNumber,
        effectiveDate: fmt((db as any).effectiveDate),
        supplyStartDate: fmt((db as any).supplyStartDate),
        maturityDate: fmt((db as any).maturityDate),
        initialTermYears: (db as any).initialTermYears ?? '',
        renewalTermYears: (db as any).renewalTermYears ?? '',
        quantity: (db as any).contractQuantity ?? '',
        pricePerMwh: money((db as any).pricePerMwh as any),
        includesNetworkTariffs: !!(db as any).includesNetworkTariffs,
        includesVat: !!(db as any).includesVat,
        paymentTermsDays: (db as any).paymentTermsDays ?? '',
        securityDepositAmount: money((db as any).securityDepositAmount as any),
        terminationNoticeDays: (db as any).terminationNoticeDays ?? '',
        earlyTerminationFee: (db as any).earlyTerminationFee ?? '',
        disputeResolutionMethod: (db as any).disputeResolutionMethod ?? '',
        forecastDeadlineDaysBeforeMonth:
          (db as any).forecastDeadlineDaysBeforeMonth ?? '',
      },
      // Optional: expose a flat list of metering points if you prefer simple iteration in templates
      flatMeteringPoints: (cust?.branches || []).flatMap(b =>
        (b.meteringPoints || []).map(mp => ({
          branchId: b.id,
          branchName: b.branchName,
          ...mp,
        })),
      ),
    };
  }

  private validateContext(ctx: any) {
    const missing: string[] = [];

    // Customer (mandatory)
    if (!ctx.customer.companyName) missing.push('customer.companyName');
    if (!ctx.customer.registeredAddress) missing.push('customer.registeredAddress');
    if (!ctx.customer.cityRegion) missing.push('customer.cityRegion');
    if (!ctx.customer.registrationNumber) missing.push('customer.registrationNumber');
    if (!ctx.customer.defaultOperationalEmail) missing.push('customer.defaultOperationalEmail');
    if (!ctx.customer.phone) missing.push('customer.phone');
    if (!ctx.customer.authorizedRepresentative) missing.push('customer.authorizedRepresentative');
    if (!ctx.customer.companyRole) missing.push('customer.companyRole');
    if (!ctx.customer.legalStatus) missing.push('customer.legalStatus');

    // Contract (mandatory)
    if (!ctx.contract.effectiveDate) missing.push('contract.effectiveDate');
    if (!ctx.contract.number) missing.push('contract.number');

    // Supplier (mandatory if fully dynamic)
    if (!ctx.supplier.name) missing.push('supplier.name');
    if (!ctx.supplier.address) missing.push('supplier.address');
    if (!ctx.supplier.phone) missing.push('supplier.phone');
    if (!ctx.supplier.email) missing.push('supplier.email');
    if (!ctx.supplier.regNo) missing.push('supplier.regNo');
    if (!ctx.supplier.licenseNo) missing.push('supplier.licenseNo');

    if (missing.length) {
      throw new BadRequestException(
        `Missing required fields: ${missing.join(', ')}`,
      );
    }
  }
}
