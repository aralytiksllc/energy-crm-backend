import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { parse } from 'csv-parse';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { camelizeKeys } from 'humps';
import { parse as parseDate, isValid } from 'date-fns';
import * as tz from 'date-fns-tz';

interface CsvValidationError {
  row: number;
  errors: string[];
}

interface CsvValidationResult {
  data: any[];
  errors: CsvValidationError[];
}

export function parseDateAndTimeToUTC(
  dateStr: string,
  timeStr: string,
): Date | null {
  try {
    const candidates = ['dd/MM/yyyy HH:mm:ss', 'dd/MM/yyyy HH:mm'] as const;

    for (const fmt of candidates) {
      const local = parseDate(`${dateStr} ${timeStr}`, fmt, new Date());
      if (isValid(local)) {
        return tz.toZonedTime(local, 'Europe/Tirane');
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

@Injectable()
export class CsvParserInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (!request.file) {
      throw new BadRequestException('No CSV file uploaded');
    }

    if (request.file.mimetype !== 'text/csv') {
      throw new BadRequestException('Uploaded file must be a CSV');
    }

    try {
      const records = await this.parseCsv(request.file.buffer);

      const { data, errors } = await this.validateAllRows(records);

      request.csvData = data;

      request.csvErrors = errors;

      return next.handle();
    } catch (error) {
      throw new BadRequestException(`CSV processing failed: ${error.message}`);
    }
  }

  private async parseCsv(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      parse(
        buffer,
        {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        },
        (err, records) => {
          if (err) return reject(err);

          const out = records.map((r: any) => {
            const row = camelizeKeys(r);

            return {
              timestamp: parseDateAndTimeToUTC(row.date, row.time),
              electricityConsumptionKwh: Number(row.electricityConsumptionKwh),
              timeframe: '15m',
            };
          });

          resolve(out);
        },
      );
    });
  }

  private async validateAllRows(rows: any[]): Promise<CsvValidationResult> {
    const data: any[] = [];
    const errors: CsvValidationError[] = [];

    for (let i = 0; i < rows.length; i++) {
      const rowNumber = i + 1;
      const dtoInstance = plainToInstance(this.dto, rows[i]);

      const validationErrors = await validate(dtoInstance);

      if (validationErrors.length > 0) {
        const errorMessages = validationErrors.flatMap((err) =>
          Object.values(err.constraints || {}),
        );

        errors.push({ row: rowNumber, errors: errorMessages });
      } else {
        data.push(dtoInstance);
      }
    }

    return { data, errors };
  }
}
