import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Request } from 'express';
import { AppLoggerService } from './app-logger.service';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    this.handleRequest(context);

    return next.handle().pipe(
      tap(() => this.handleSuccess(context, now)),
      catchError((error) => this.handleFailure(context, now, error)),
    );
  }

  private handleRequest(context: ExecutionContext): void {
    const request = this.getRequest(context);
    const controller = context.getClass().name;
    const handler = context.getHandler().name;

    const method = request.method;
    const url = request.url;
    const params = JSON.stringify(request.params || {});
    const query = JSON.stringify(request.query || {});
    const body = JSON.stringify(request.body || {});

    this.logger.log(
      `[${method}] ${url} → ${controller}.${handler} started\n` +
        `Params: ${params}\nQuery: ${query}\nBody: ${body}`,
      controller,
    );
  }

  private handleSuccess(context: ExecutionContext, startTime: number): void {
    const request = this.getRequest(context);
    const controller = context.getClass().name;
    const handler = context.getHandler().name;

    const method = request.method;
    const url = request.url;
    const duration = Date.now() - startTime;

    this.logger.log(
      `[${method}] ${url} ← ${controller}.${handler} completed in ${duration}ms`,
      controller,
    );
  }

  private handleFailure(
    context: ExecutionContext,
    startTime: number,
    error: Error,
  ): Observable<never> {
    const request = this.getRequest(context);
    const controller = context.getClass().name;
    const handler = context.getHandler().name;

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

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }
}
