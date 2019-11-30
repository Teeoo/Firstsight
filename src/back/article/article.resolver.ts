import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Category } from '../../database/entity/category.entity';
import { BaseDto } from '../../shared/base/base.dto';
import { ObjectType, PubSubEngine } from 'type-graphql';
import { BasePaginate } from '../../shared/base/base.paginate';
import { Article } from '../../database/entity/article.entity';
import { BaseResolver } from '../../shared/base/base.resolver';
import { NewArticleInput, UpdateArticleInput } from './article.dto';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { User } from '../../database/entity/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Auth } from '../../shared/guards/auth.guard';

/**
 * @description Paginate
 * @export
 * @class ArticlePaginate
 * @extends {BasePaginate(Article)}
 */
@ObjectType({ description: `${Article.name} Paginate` })
export class ArticlePaginate extends BasePaginate(Article) {}

/**
 * @description
 * @export
 * @class ArticleResolver
 * @extends {BaseResolver(Article, ArticlePaginate)}
 */
@UseGuards(new Auth())
@Resolver('Article')
export class ArticleResolver extends BaseResolver(Article, ArticlePaginate) {
  /**
   * Creates an instance of ArticleResolver.
   * @param {ArticleService} service
   * @param {PubSubEngine} pubSub
   * @memberof ArticleResolver
   */
  constructor(
    protected readonly service: ArticleService,
    @Inject('REDIS_SUB') private pubSub: PubSubEngine,
  ) {
    super(service, pubSub);
  }

  /**
   * @description newArticle
   * @param {NewArticleInput} data
   * @param {User} user
   * @returns {(Promise<Article | Article[]>)}
   * @memberof ArticleResolver
   */
  @Mutation(() => Article, {
    description: `Create ${Article.name}`,
  })
  public async newArticle(
    @Args('data') data: NewArticleInput,
    @AuthUser() user: User,
  ): Promise<Article | Article[]> {
    return await this.service.createMany(data, user);
  }

  /**
   * @description updateArticle
   * @param {BaseDto} { id }
   * @param {UpdateArticleInput} data
   * @returns {Promise<Category>}
   * @memberof ArticleResolver
   */
  @Mutation(() => Article, {
    description: `Update ${Article.name}`,
  })
  public async updateArticle(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateArticleInput,
  ): Promise<Category> {
    return await this.service.updateMany(id, data);
  }
}
