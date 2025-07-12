// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
