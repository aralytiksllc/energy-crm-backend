import * as bcrypt from 'bcrypt';

export class Hash {
  private static readonly SALT_ROUNDS = 12;

  static async make(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(plainText, salt);
  }

  static async compare(plainText: string, hashText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashText);
  }
}
