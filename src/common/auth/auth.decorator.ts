import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from './auth.constants';

export function Public() {
  return SetMetadata(IS_PUBLIC, true);
}
