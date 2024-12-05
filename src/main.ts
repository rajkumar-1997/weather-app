import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './common/winston.logger';
import { Logger } from 'winston';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
  const logger = app.get<Logger>('winston');
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  await app.listen(3000);
}
bootstrap();
