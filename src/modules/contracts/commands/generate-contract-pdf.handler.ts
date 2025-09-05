// External
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import Handlebars from 'handlebars';
import path from 'path';
import * as fs from 'fs/promises';

// Internal
import { PuppeteerService } from '@/common/puppeteer';
import { PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contract } from '@/common/prisma/prisma.client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { GenerateContractPdfCommand } from './generate-contract-pdf.command';

@CommandHandler(GenerateContractPdfCommand)
export class GenerateContractPdfHandler
  implements ICommandHandler<GenerateContractPdfCommand, Buffer>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly pptr: PuppeteerService,
  ) {}

  async execute(command: GenerateContractPdfCommand): Promise<Buffer> {
    const contract = await this.prisma.client.contract.findUniqueOrThrow({
      where: { id: command.id },
      include: {
        customer: {
          include: {
            branches: { include: { MeteringPoint: true } },
            contacts: true,
          },
        },
      },
    });

    const [headerHtml, contentHtml, footerHtml] = await Promise.all([
      this.renderHtml('contract.footer.al.hbs', contract),
      this.renderHtml('contract.footer.al.hbs', contract),
      this.renderHtml('contract.footer.al.hbs', contract),
    ]);

    const browser = await this.pptr.getBrowser();
    const page = await browser.newPage();

    try {
      await page.emulateMediaType('print');
      await page.setContent(contentHtml, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: headerHtml,
        footerTemplate: footerHtml,
        margin: { top: '20mm', bottom: '24mm', left: '20mm', right: '20mm' },
        preferCSSPageSize: true,
      });

      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  }

  private async renderHtml(filename: string, model: Contract): Promise<string> {
    const templateDir = path.resolve(__dirname, '..', 'templates');
    const src = await fs.readFile(path.join(templateDir, filename), 'utf8');
    return Handlebars.compile(src)(model);
  }
}
