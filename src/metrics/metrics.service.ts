import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram, Gauge } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly httpRequestsTotal: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDuration: Histogram<string>,
    @InjectMetric('active_connections')
    private readonly activeConnections: Gauge<string>,
  ) {}

  incrementHttpRequests(method: string, route: string, statusCode: number): void {
    this.httpRequestsTotal
      .labels({ method, route, status_code: statusCode.toString() })
      .inc();
  }

  recordHttpRequestDuration(
    method: string,
    route: string,
    statusCode: number,
    duration: number,
  ): void {
    this.httpRequestDuration
      .labels({ method, route, status_code: statusCode.toString() })
      .observe(duration);
  }

  setActiveConnections(count: number): void {
    this.activeConnections.set(count);
  }

  incrementActiveConnections(): void {
    this.activeConnections.inc();
  }

  decrementActiveConnections(): void {
    this.activeConnections.dec();
  }
}
