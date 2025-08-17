// External
import { Injectable } from '@nestjs/common';

// Internal

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
