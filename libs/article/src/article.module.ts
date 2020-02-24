import { Module, forwardRef } from '@nestjs/common'
import { ArticleService } from './article.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './article.entity'
import { LibCategoryModule } from '@app/category'
import { LibTagsModule } from '@app/tags'
import { LibFieldsModule } from '@app/fields'

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    forwardRef(() => LibCategoryModule),
    forwardRef(() => LibTagsModule),
    forwardRef(() => LibFieldsModule),
  ],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class LibArticleModule {}
