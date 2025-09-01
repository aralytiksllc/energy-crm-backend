import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { EmailRequest } from './email.interfaces';
import { EmailRetryPolicy } from './email.retry-policy';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = createTransport({
      host: this.config.getOrThrow('EMAIL_HOST'),
      port: Number(this.config.getOrThrow('EMAIL_PORT')),
      secure: this.config.getOrThrow('EMAIL_ENABLE_SSL') === 'true',
      auth: {
        user: this.config.getOrThrow('EMAIL_USERNAME'),
        pass: this.config.getOrThrow('EMAIL_PASSWORD'),
      },
      tls:
        this.config.get('EMAIL_REQUIRE_TLS') === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    });
  }

  async sendAsync(request: EmailRequest): Promise<void> {
    const to = request.to.filter(Boolean);

    if (to.length === 0) return;

    const mailOptions: SendMailOptions = {
      from: this.config.getOrThrow('EMAIL_FROM'),
      to: to.join(','),
      subject: request.subject,
      html: request.htmlBody,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`SMTP failure: ${(error as Error).message}`);
    }
  }

  async sendWithRetryAsync(request: EmailRequest): Promise<void> {
    await EmailRetryPolicy.execute(() => this.sendAsync(request));
  }
}
