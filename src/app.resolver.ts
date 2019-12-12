import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Article } from './database/entity/article.entity';
import { ArticlePaginate } from './back/article/article.resolver';
import { BaseDto } from './shared/base/base.dto';
import { Category } from './database/entity/category.entity';
import { Tags } from './database/entity/tags.entity';
import { Links } from './database/entity/links.entity';

@Resolver('App')
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [Article], {
    description: '获取所有单页面',
  })
  public async page() {
    return await this.appService.page();
  }

  @Query(() => ArticlePaginate, {
    description: '获取分页文章',
  })
  public async article() {
    return await this.appService.article();
  }

  @Query(() => Article, {
    description: '根据id获取文章详情',
  })
  public async articleDetails(@Args() { id }: BaseDto) {
    return await this.appService.articleDetails(id);
  }

  @Query(() => Article, {
    description: '根据id获取页面详情',
  })
  public async pageDetails(@Args() { id }: BaseDto) {
    return await this.appService.pageDetails(id);
  }

  @Query(() => [Category], {
    description: '获取全部分类',
  })
  public async category() {
    return await this.appService.category();
  }

  @Query(() => [Tags], {
    description: '获取全部标签',
  })
  public async tags() {
    return await this.appService.tags();
  }

  @Query(() => [Links], {
    description: '获取全部友联',
  })
  public async links() {
    return await this.appService.links();
  }
}
