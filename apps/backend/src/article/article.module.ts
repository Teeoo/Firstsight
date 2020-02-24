import { Module } from '@nestjs/common'
import { ArticleResolver } from './article.resolver'
import { ArticleController } from './article.controller'
import { LibArticleModule } from '@app/article'

@Module({
  imports: [LibArticleModule],
  providers: [ArticleResolver],
  controllers: [ArticleController],
})
export class ArticleModule {}
