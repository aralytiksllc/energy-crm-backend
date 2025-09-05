// External
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import * as fs from 'fs';

// Internal

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser?: Browser;
  private readonly logger = new Logger(PuppeteerService.name);

  async getBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;

    const bundledPath = await puppeteer.executablePath();
    const systemChrome = '/usr/bin/google-chrome';

    let executablePath: string | undefined;

    if (fs.existsSync(bundledPath)) {
      executablePath = bundledPath;
    } else if (fs.existsSync(systemChrome)) {
      executablePath = systemChrome;
      this.logger.warn('Using system Chrome');
    }

    this.logger.log(`Launching browser (${executablePath ?? 'auto-detect'})`);

    this.browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
      ],
    });

    return this.browser;
  }

  async onModuleDestroy() {
    await this.browser?.close();
    this.logger.log('Browser closed');
    this.browser = undefined;
  }
}
