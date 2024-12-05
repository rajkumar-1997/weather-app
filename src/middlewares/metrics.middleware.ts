import { Injectable, NestMiddleware } from '@nestjs/common';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: any, res: any, next: () => void) {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      // Increment request count
      this.metricsService.incrementHttpRequests(
        req.path,
        req.method,
        res.statusCode.toString(),
      );

      // Record request duration
      this.metricsService.observeHttpRequestDuration(
        duration,
        req.path,
        req.method,
      );
    });

    next();
  }
}
