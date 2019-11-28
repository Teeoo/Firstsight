import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './back/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './back/category/category.module';
import { ArticleModule } from './back/article/article.module';
import { TagsModule } from './back/tags/tags.module';
import { LinksModule } from './back/links/links.module';
import { HelperModule } from './back/helper/helper.module';
import { FieldsModule } from './back/fields/fields.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config/**/!(*.d).{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (conf: ConfigService) => conf.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (conf: ConfigService) => conf.get('graphql'),
      inject: [ConfigService],
    }),
    AuthModule,
    CategoryModule,
    ArticleModule,
    TagsModule,
    LinksModule,
    HelperModule,
    FieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
