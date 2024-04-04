import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerCustomGuard } from './throttler-custom-guard';

export const throttlerAsyncOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => [
    {
      ttl: 3000,
      limit: 5,
      storage: new ThrottlerStorageRedisService(),
      port: configService.get<number>('redis.port'),
      host: configService.get<string>('redis.hosts'),
    },
  ],
};

export const throttlerServiceProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerCustomGuard,
};
