import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { AppLoggerService } from './app-logger.service';
import { Request } from 'express';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = this.getRequest(context);
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const now = Date.now();

    this.logStart(request, controller, handler);

    return next.handle().pipe(
      tap(() => this.logSuccess(request, controller, handler, now)),
      catchError((error) =>
        this.handleError(request, controller, handler, now, error),
      ),
    );
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }

  private logStart(
    request: Request,
    controller: string,
    handler: string,
  ): void {
    const method = request.method;
    const url = request.url;

    const params = JSON.stringify(request.params || {});
    const query = JSON.stringify(request.query || {});
    const body = JSON.stringify(this.sanitizeBody(request.body || {}));

    this.logger.log(
      `[${method}] ${url} → ${controller}.${handler} started\n` +
        `Params: ${params}\nQuery: ${query}\nBody: ${body}`,
      controller,
    );
  }

  private logSuccess(
    request: Request,
    controller: string,
    handler: string,
    startTime: number,
  ): void {
    const method = request.method;
    const url = request.url;
    const duration = Date.now() - startTime;

    this.logger.log(
      `[${method}] ${url} ← ${controller}.${handler} completed in ${duration}ms`,
      controller,
    );
  }

  private handleError(
    request: Request,
    controller: string,
    handler: string,
    startTime: number,
    error: any,
  ): Observable<never> {
    const method = request.method;
    const url = request.url;
    const duration = Date.now() - startTime;

    this.logger.error(
      `[${method}] ${url} ✖ ${controller}.${handler} failed in ${duration}ms: ${error.message}`,
      error.stack,
      controller,
    );

    return throwError(() => error);
  }

  private sanitizeBody(body: any): any {
    const clone = { ...body };
    const sensitiveFields = ['password', 'token'];

    for (const key of sensitiveFields) {
      if (key in clone) {
        clone[key] = '[REDACTED]';
      }
    }

    return clone;
  }
}
