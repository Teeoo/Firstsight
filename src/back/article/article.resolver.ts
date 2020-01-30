import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { Article } from '@app/databases/entity/Article';
import { BasePaginate, BaseResolver, BaseDto } from '@app/shared';
import { ArticleService } from './article.service';
import { NewArticleInput, UpdateArticleInput } from './article.dto';
import { User } from '@app/databases/entity/User';
import { AuthUser } from '@app/core/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@app/core';

@ObjectType({ description: `${Article.name} Paginate` })
export class ArticlePaginate extends BasePaginate(Article) {}

@UseGuards(new AuthorizationGuard())
@Resolver('Article')
export class ArticleResolver extends BaseResolver(Article, ArticlePaginate) {
  /**
   * Creates an instance of ArticleResolver.
   * @author lee
   * @date 2020-01-20
   * @param {ArticleService} service
   * @memberof ArticleResolver
   */
  constructor(protected readonly service: ArticleService) {
    super(service);
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
    return await this.service.createMany(data, user);
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
    return await this.service.updateMany(id, data);
  }
}
