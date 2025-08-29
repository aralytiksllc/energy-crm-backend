// puppeteer.service.ts
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser?: Browser;
  private launching?: Promise<Browser>;
  private readonly logger = new Logger(PuppeteerService.name);

  async getBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;

    const executablePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      process.env.CHROME_BIN ||
      undefined;

    this.logger.log(`Launching Chrome at: ${executablePath ?? '(bundled)'}`);

    this.launching = puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
      ],
    });

    this.browser = await this.launching;
    return this.browser;
  }

  async onModuleDestroy() {
    await this.browser?.close();
    this.browser = undefined;
    this.launching = undefined;
  }
}
