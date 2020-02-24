import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from '@app/common'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { FieldsModule } from './fields/fields.module'
import { TagsModule } from './tags/tags.module'
import { LinksModule } from './links/links.module'

@Module({
  imports: [
    CommonModule,
    AuthModule,
    CategoryModule,
    ArticleModule,
    FieldsModule,
    TagsModule,
    LinksModule,
  ],
})
export class AppModule {}
