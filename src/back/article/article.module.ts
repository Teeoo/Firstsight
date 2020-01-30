import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleController } from './article.controller';
import { CategoryModule } from '../category/category.module';
import { TagsModule } from '../tags/tags.module';
import { FieldsModule } from '../fields/fields.module';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => TagsModule),
    forwardRef(() => FieldsModule),
  ],
  providers: [ArticleService, ArticleResolver],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
