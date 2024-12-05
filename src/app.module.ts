import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { WeatherReportModule } from './weather-report/weather-report.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './common/winston.logger';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';
import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 0, limit: 0 }]),
    WinstonModule.forRoot(winstonLoggerConfig),
    CacheModule.register({
      isGlobal: true,
    }),
    UtilsModule,
    WeatherReportModule,
    ThirdPartyModule,
    HealthModule,
    HttpModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
