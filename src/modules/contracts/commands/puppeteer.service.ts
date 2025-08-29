// puppeteer.service.ts
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser?: Browser;
  private readonly logger = new Logger(PuppeteerService.name);

  async getBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;

    this.logger.log('Launching bundled Chromium via puppeteer');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    return this.browser;
  }

  async onModuleDestroy() {
    await this.browser?.close();
    this.browser = undefined;
  }
}
