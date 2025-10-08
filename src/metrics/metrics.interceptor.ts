import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    const startTime = Date.now();
    const method = request.method;
    const route = request.route?.path || request.path;

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = (Date.now() - startTime) / 1000;
          const statusCode = response.statusCode;
          
          this.metricsService.incrementHttpRequests(method, route, statusCode);
          this.metricsService.recordHttpRequestDuration(method, route, statusCode, duration);
        },
        error: (error) => {
          const duration = (Date.now() - startTime) / 1000;
          const statusCode = error.status || 500;
          
          this.metricsService.incrementHttpRequests(method, route, statusCode);
          this.metricsService.recordHttpRequestDuration(method, route, statusCode, duration);
        },
      }),
    );
  }
}
