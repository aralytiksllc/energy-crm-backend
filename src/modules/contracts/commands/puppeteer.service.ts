// puppeteer.service.ts
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser?: Browser;
  private readonly logger = new Logger(PuppeteerService.name);

  async getBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;

    const bundledPath = await puppeteer.executablePath();
    this.logger.log(`Puppeteer executablePath(): ${bundledPath}`);
    this.logger.log(`exists(executablePath) = ${fs.existsSync(bundledPath)}`);

    const systemChrome = '/usr/bin/google-chrome';
    this.logger.log(`exists(${systemChrome}) = ${fs.existsSync(systemChrome)}`);

    let executablePath = fs.existsSync(bundledPath) ? bundledPath : undefined;

    if (!executablePath && fs.existsSync(systemChrome)) {
      executablePath = systemChrome;
      this.logger.warn(
        'Falling back to system Chrome at /usr/bin/google-chrome',
      );
    }

    this.logger.log(
      `Launching Chrome with executablePath=${executablePath ?? '(auto)'}`,
    );

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
    this.browser = undefined;
  }
}
