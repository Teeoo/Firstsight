import { Injectable, Inject, forwardRef, HttpException } from '@nestjs/common';
import { CategoryService } from './back/category/category.service';
import { TagsService } from './back/tags/tags.service';
import { ArticleService } from './back/article/article.service';
import { Article } from './database/entity/article.entity';
import { Category } from './database/entity/category.entity';
import { Tags } from './database/entity/tags.entity';
import { Paginate } from './shared/base/base.dto';
import { Links } from './database/entity/links.entity';
import { LinksService } from './back/links/links.service';

@Injectable()
export class AppService {
  /**
   * Creates an instance of AppService.
   * @param {ArticleService} articleService
   * @param {CategoryService} cateService
   * @param {TagsService} tagsService
   * @param {LinksService} linksService
   * @memberof AppService
   */
  constructor(
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => CategoryService))
    private readonly cateService: CategoryService,
    @Inject(forwardRef(() => TagsService))
    private readonly tagsService: TagsService,
    @Inject(forwardRef(() => LinksService))
    private readonly linksService: LinksService,
  ) {}

  /**
   * @description 获取所有单页面
   * @returns {Promise<Article[]>}
   * @memberof AppService
   */
  public async page(): Promise<Article[]> {
    return await this.articleService.find({
      where: {
        type: 'page',
      },
      order: {
        order: 'ASC',
      },
      cache: true,
    });
  }

  /**
   * @description 获取分页文章
   * @param {number} [page=0]
   * @param {number} [limit=10]
   * @returns {Promise<Paginate>}
   * @memberof AppService
   */
  public async article(
    page: number = 0,
    limit: number = 10,
  ): Promise<Paginate> {
    return await this.articleService.getMany(
      { page, limit },
      { order: 'ASC', isTop: 'DESC' },
      {
        type: 'article',
      },
    );
  }

  /**
   * @description 根据id获取文章详情
   * @param {string} id
   * @returns {Promise<Article>}
   * @memberof AppService
   */
  public async articleDetails(id: string): Promise<Article> {
    const result = await this.articleService.findOne({
      where: {
        type: 'article',
        id,
      },
      cache: true,
    });
    if (!result) {
      throw new HttpException('没有找到该文章', 400);
    }
    return result;
  }

  /**
   * @description 根据id获取页面详情
   * @param {string} id
   * @returns {Promise<Article>}
   * @memberof AppService
   */
  public async pageDetails(id: string): Promise<Article> {
    const result = await this.articleService.findOne({
      where: {
        type: 'page',
        id,
      },
      cache: true,
    });
    if (!result) {
      throw new HttpException('没有找到该文章', 400);
    }
    return result;
  }

  /**
   * @description 获取全部分类
   * @returns {Promise<Category[]>}
   * @memberof AppService
   */
  public async category(): Promise<Category[]> {
    return await this.cateService.find({
      order: {
        order: 'ASC',
      },
      cache: true,
    });
  }

  /**
   * @description 获取全部标签
   * @returns {Promise<Tags[]>}
   * @memberof AppService
   */
  public async tags(): Promise<Tags[]> {
    return await this.tagsService.find({
      order: {
        hot: 'ASC',
      },
      cache: true,
    });
  }

  /**
   * @description 获取全部友联
   * @returns {Promise<Links[]>}
   * @memberof AppService
   */
  public async links(): Promise<Links[]> {
    return await this.linksService.find({
      cache: true,
    });
  }
}
