import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ThrottlerLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ThrottlerLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    
    this.logger.log(
      `Request: ${method} ${url} from IP: ${ip}`,
      'ThrottlerLogger'
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Response: ${method} ${url} - Success`,
          'ThrottlerLogger'
        );
      })
    );
  }
}
