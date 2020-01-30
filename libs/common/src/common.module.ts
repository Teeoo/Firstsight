import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabasesModule } from '@app/databases';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFormattedError, GraphQLError } from 'graphql';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
const MAO = require('multer-aliyun-oss');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (conf: ConfigService) => ({
        context: ({ req, connection }) =>
          connection ? { req: connection.context } : { req },
        formatResponse: (res: any, req: any) => {
          return res;
        },
        formatError: (error: GraphQLError): GraphQLFormattedError => {
          return {
            message: error.message,
            ...(error.locations && { locations: error.locations }),
            ...(error.path && { path: error.path }),
            ...(error.extensions && { extensions: error.extensions }),
          };
        },
        uploads: true,
        playground: Boolean(process.env.GRAPHQL_PLAYGROUND),
        debug: true,
        autoSchemaFile: Boolean(process.env.GRAPHQL_AUTOFILE),
        installSubscriptionHandlers: Boolean(process.env.GRAPHQL_SUBSCRIPTIONS),
        subscriptions: {
          onConnect: (connectionParams: any) => {
            return connectionParams.headers
              ? connectionParams
              : { headers: { authorization: connectionParams.authorization } };
          },
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        storage: MAO({
          config: {
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAI4Fj2Q5v8SSwzxUgcSiHi',
            accessKeySecret: 'PfPvllcBpyNjAOaKO3HTXWfVqpfjNu',
            bucket: 'teeoo',
          },
        }),
      }),
    }),
    DatabasesModule,
  ],
  providers: [CommonService],
  exports: [MulterModule, JwtModule, PassportModule],
})
export class CommonModule {}
