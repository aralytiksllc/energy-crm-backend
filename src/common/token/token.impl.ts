import * as crypto from 'crypto';

export class Token {
  private static readonly LENGTH = 32;

  static generate(): string {
    return crypto
      .randomBytes(this.LENGTH)
      .toString('hex')
      .slice(0, this.LENGTH);
  }
}
