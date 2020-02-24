import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@app/auth/auth.entity'
import { UserSubscriber } from '@app/auth/auth.subscriber'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { Category } from '@app/category/category.entity'
import { CategorySubscriber } from '@app/category/category.subscriber'
import { Article } from '@app/article/article.entity'
import { Tags } from '@app/tags/tags.entity'
import { Fields } from '@app/fields/fields.entity'
import { Links } from '@app/links/links.entity'

const entities = [User, Category, Article, Tags, Fields, Links]

const subscribers = [UserSubscriber, CategorySubscriber]

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (conf: ConfigService) => ({
        type: conf.get('TYPEORM_CONNECTION'),
        host: conf.get('TYPEORM_HOST'),
        port: conf.get('TYPEORM_PORT'),
        database: conf.get('TYPEORM_DATABASE'),
        username: conf.get('TYPEORM_USERNAME'),
        password: conf.get('TYPEORM_PASSWORD'),
        keepConnectionAlive: true,
        logging: true,
        entityPrefix: 'lee_',
        synchronize: true,
        dropSchema: false,
        uuidExtension: 'pgcrypto',
        entities,
        subscribers,
      }),
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req, connection }) =>
          connection ? { req: connection.context } : { req },
        formatResponse: (res: any) => {
          return res
        },
        formatError: (error: GraphQLError): GraphQLFormattedError => {
          return {
            message: error.message,
            ...(error.locations && { locations: error.locations }),
            ...(error.path && { path: error.path }),
            ...(error.extensions && { extensions: error.extensions }),
          }
        },
        uploads: true,
        playground: true,
        debug: true,
        autoSchemaFile: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          onConnect: (connectionParams: any) => {
            return connectionParams.headers
              ? connectionParams
              : { headers: { authorization: connectionParams.authorization } }
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
