// External
import { FindManyDto } from './find-many.dto';

// Internal

export class FindManyQuery<TWhereInput> {
  constructor(public readonly dto: FindManyDto<TWhereInput>) {}
}
