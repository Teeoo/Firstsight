import { Module, Global } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import * as Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Global()
@Module({
  providers: [
    // {
    //   provide: 'REDIS_SUB',
    //   useFactory: () => {
    //     const options = {
    //       host: 'localhost',
    //       port: 6379,
    //       retryStrategy: (times: number) => {
    //         return Math.min(times * 50, 2000);
    //       },
    //     };
    //     return new RedisPubSub({
    //       publisher: new Redis(options),
    //       subscriber: new Redis(options),
    //     });
    //   },
    // },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class HelperModule {}
