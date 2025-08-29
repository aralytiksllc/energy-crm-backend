import { Injectable, OnModuleDestroy } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser?: Browser;
  private launching?: Promise<Browser>;

  async getBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;
    if (!this.launching) {
      this.launching = puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
    this.browser = await this.launching;
    return this.browser;
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined;
      this.launching = undefined;
    }
  }
}
