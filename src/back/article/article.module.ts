import { forwardRef, Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../database/entity/article.entity';
import { CategoryModule } from '../category/category.module';
import { TagsModule } from '../tags/tags.module';
import { FieldsModule } from '../fields/fields.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    forwardRef(() => CategoryModule),
    forwardRef(() => TagsModule),
    forwardRef(() => FieldsModule),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
