import { Module, Global } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from './entity/User';
import { Category } from './entity/Category';
import { Article } from './entity/Article';
import { Fields } from './entity/Fields';
import { Links } from './entity/Links';
import { UserSubscriber } from './subscriber/UserSubscriber';
import { CategorySubscriber } from './subscriber/CategorySubscriber';
import { Tags } from './entity/Tags';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (conf: ConfigService) =>
        ({
          type: conf.get('TYPEORM_CONNECTION'),
          host: conf.get('TYPEORM_HOST'),
          port: conf.get('TYPEORM_PORT'),
          database: conf.get('TYPEORM_DATABASE'),
          username: conf.get('TYPEORM_USERNAME'),
          password: conf.get('TYPEORM_PASSWORD'),
          logging: true,
          entityPrefix: 'lee_',
          synchronize: true,
          dropSchema: false,
          entities: [
            // `${path.resolve(__dirname, '..')}${String(process.env.TYPEORM_ENTITIES)}`,
            // `${__dirname}/${String(process.env.TYPEORM_ENTITIES)}`
            User,
            Category,
            Article,
            Fields,
            Links,
            Tags,
          ],
          subscribers: [
            // `${path.resolve(__dirname, '..')}${String(
            //   process.env.TYPEORM_SUBSCRIBERS,
            // )}`,
            UserSubscriber,
            CategorySubscriber,
          ],
          cache: {
            type: 'ioredis',
            options: {
              host: conf.get('CACHE_HOST'),
              port: conf.get('CACHE_PORT'),
              password: conf.get('CACHE_PASSWORD'),
              options: {
                scaleReads: 'all',
              },
            },
          },
        } as TypeOrmModuleOptions),
    }),
    TypeOrmModule.forFeature([User, Category, Tags, Article, Fields, Links]),
  ],
  exports: [TypeOrmModule],
})
export class DatabasesModule {}
