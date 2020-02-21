import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'apps/backend/src/auth/auth.entity'

const entities = [User]

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      }),
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
