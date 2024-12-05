import { Injectable, Inject } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @Inject('HTTP_REQUESTS_TOTAL')
    private readonly httpRequestsTotal: Counter<string>,
    @Inject('HTTP_REQUEST_DURATION_MILISECOND')
    private readonly httpRequestDuration: Histogram<string>,
    @Inject('PROM_REGISTRY')
    private readonly registry: Registry,
  ) {
    this.registry.registerMetric(this.httpRequestsTotal);
    this.registry.registerMetric(this.httpRequestDuration);
  }

  incrementHttpRequests(path: string, method: string, status: string) {
    this.httpRequestsTotal.inc({ path, method, status });
  }

  observeHttpRequestDuration(duration: number, path: string, method: string) {
    this.httpRequestDuration.observe({ path, method }, duration);
  }

  async getMetrics() {
    return this.registry.metrics();
  }
}
