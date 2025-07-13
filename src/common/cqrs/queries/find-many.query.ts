import { Query } from '@/common/query/query.impl';
import { QueryParamsDto } from '@/common/query/dtos/query-params.dto';

export class FindManyQuery<WhereInput, OrderByInput> extends Query<
  WhereInput,
  OrderByInput
> {
  constructor(dto: QueryParamsDto) {
    super(dto);
  }
}
