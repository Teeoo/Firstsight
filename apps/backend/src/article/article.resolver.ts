import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { ObjectType } from 'type-graphql'
import { Article } from '@app/article/article.entity'
import { CrudPaginate } from '@app/core/crud/crud.paginate'
import { UseGuards } from '@nestjs/common'
import { JwtAuth } from '@app/shared/guard/auth.guard'
import { CrudResolver } from '@app/core/crud/crud.resolver'
import { ArticleService } from '@app/article'
import { NewArticleInput, UpdateArticleInput } from '@app/article/article.dto'
import { User } from '@app/auth/auth.entity'
import { BaseDto } from '@app/core/crud/crud.dto'
import { AuthUser } from '@app/shared/decorators/user.decorator'

@ObjectType({ description: `${Article.name} Paginate` })
export class ArticlePaginate extends CrudPaginate(Article) {}

@UseGuards(new JwtAuth())
@Resolver('Article')
export class ArticleResolver extends CrudResolver(Article, ArticlePaginate) {
  /**
   * Creates an instance of ArticleResolver.
   * @author lee
   * @date 2020-01-20
   * @param {ArticleService} service
   * @memberof ArticleResolver
   */
  constructor(protected readonly service: ArticleService) {
    super(service)
  }

  /**
   * @description newArticle
   * @author lee
   * @date 2020-01-20
   * @param {NewArticleInput} data
   * @param {User} user
   * @returns {(Promise<Article | Article[]>)}
   * @memberof ArticleResolver
   */
  @Mutation(() => Article, {
    description: `Create a new ${Article.name}`,
  })
  public async newArticle(
    @Args('data') data: NewArticleInput,
    @AuthUser() user: User,
  ): Promise<Article | Article[]> {
    return await this.service.createMany(data, user)
  }

  /**
   * @description updateArticle
   * @author lee
   * @date 2020-01-20
   * @param {BaseDto} { id }
   * @param {UpdateArticleInput} data
   * @returns {Promise<Article>}
   * @memberof ArticleResolver
   */
  @Mutation(() => Article, {
    description: `Modify ${Article.name} based on id`,
  })
  public async updateArticle(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateArticleInput,
  ): Promise<Article> {
    return await this.service.updateMany(id, data)
  }
}
