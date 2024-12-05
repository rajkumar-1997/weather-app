import { Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { CacheService } from './cache.service';

@Module({
  providers: [ApiClientService, CacheService],
  exports: [ApiClientService, CacheService],
})
export class UtilsModule {}
