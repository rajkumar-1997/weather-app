import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as promClient from 'prom-client';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    {
      provide: 'HTTP_REQUESTS_TOTAL',
      useFactory: () => {
        return new promClient.Counter({
          name: 'http_requests_total',
          help: 'Total number of HTTP requests',
          labelNames: ['path', 'method', 'status'],
        });
      },
    },
    {
      provide: 'HTTP_REQUEST_DURATION_MILISECOND',
      useFactory: () => {
        return new promClient.Histogram({
          name: 'http_request_duration_milisecond',
          help: 'Duration of HTTP requests in milisecond',
          labelNames: ['path', 'method'],
          buckets: [50, 100, 150, 200, 500],
        });
      },
    },
    {
      provide: 'PROM_REGISTRY',
      useFactory: () => {
        return new promClient.Registry();
      },
    },
    MetricsService,
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
