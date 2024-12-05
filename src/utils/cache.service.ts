import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  async getValue(key: string) {
    return await this.cacheManager.get(key);
  }

  async setValue(key: string, value: any, ttl?: number) {
    if (ttl && ttl !== -1) {
      await this.cacheManager.set(key, value, { ttl });
    } else {
      await this.cacheManager.set(key, value);
    }
  }

  async deleteValue(key: string) {
    await this.cacheManager.del(key);
  }
}
