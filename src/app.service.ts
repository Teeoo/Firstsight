import { Injectable, Inject, forwardRef, HttpException } from '@nestjs/common';
import { ArticleService } from './back/article/article.service';
import { CategoryService } from './back/category/category.service';
import { TagsService } from './back/tags/tags.service';
import { Article } from '@app/databases/entity/Article';
import { Paginate } from './shared';
import { Category } from '@app/databases/entity/Category';
import { Tags } from '@app/databases/entity/Tags';
import { Links } from '@app/databases/entity/Links';
import { LinksService } from './back/links/links.service';

@Injectable()
export class AppService {

  constructor(
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => CategoryService))
    private readonly cateService: CategoryService,
    @Inject(forwardRef(() => TagsService))
    private readonly tagsService: TagsService,
    @Inject(forwardRef(() => LinksService))
    private readonly linksService: LinksService,
  ) { }

  /**
   * @description 获取所有单页面
   * @author lee
   * @date 2020-01-26
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
   * @description 获取带分页的文章
   * @author lee
   * @date 2020-01-26
   * @param {number} [page=0]
   * @param {number} [limit=10]
   * @returns {Promise<Paginate<Article>>}
   * @memberof AppService
   */
  public async article(
    page: number = 0,
    limit: number = 10,
  ): Promise<Paginate<Article>> {
    return await this.articleService.paginator(
      { page, limit },
      { order: 'ASC', isTop: 'DESC' },
      {
        type: 'article',
      },
    );
  }

  /**
   * @description 根据id获取文章详情
   * @author lee
   * @date 2020-01-26
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
   * @author lee
   * @date 2020-01-26
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
   * @description 获取分类
   * @author lee
   * @date 2020-01-26
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
   * @description 获取标签
   * @author lee
   * @date 2020-01-26
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
   * @description 获取友联
   * @author lee
   * @date 2020-01-26
   * @returns {Promise<Links[]>}
   * @memberof AppService
   */
  public async links(): Promise<Links[]> {
    return await this.linksService.find({
      cache: true,
    });
  }

  /**
   * @description 文章归档
   * @author lee
   * @date 2020-01-26
   * @returns 
   * @memberof AppService
   */
  public async archive() {
    const data = await this.articleService.find(
      {
        order: { createdAt: 'DESC' },
        where: {
          type: 'article',
        },
        select: ["id", "title", "createdAt"]
      }
    );
    const result = {}
    data.forEach(item => {
      let yearMonth: any = item.createdAt
      if (!(yearMonth in result)) {
        result[yearMonth] = [];
      }
      result[yearMonth].push(item);
    })
    return result
  }
}
