import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
