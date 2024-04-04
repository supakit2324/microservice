import { CacheModuleAsyncOptions } from '@nestjs/common/cache/interfaces/cache-module.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { redisStore } from "cache-manager-redis-store";
import { RedisClientOptions } from 'redis';

export const RegisterCacheOptions: CacheModuleAsyncOptions = ({
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('redis.host'),
    port: configService.get<number>('redis.port'),
  } as RedisClientOptions)
})

export const cachingServiceProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}