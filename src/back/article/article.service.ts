import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Article } from '../../database/entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { TagsService } from '../tags/tags.service';
import { User } from '../../database/entity/user.entity';
import { FieldsService } from '../fields/fields.service';

/**
 * @description
 * @export
 * @class ArticleService
 * @extends {BaseService<Article>}
 */
@Injectable()
export class ArticleService extends BaseService<Article> {
  /**
   * Creates an instance of ArticleService.
   * @param {TreeRepository<Article>} repo
   * @param {CategoryService} cateService
   * @param {TagsService} tagsService
   * @param {FieldsService} fieldService
   * @memberof ArticleService
   */
  constructor(
    @InjectRepository(Article)
    protected readonly repo: TreeRepository<Article>,
    @Inject(forwardRef(() => CategoryService))
    private readonly cateService: CategoryService,
    @Inject(forwardRef(() => TagsService))
    private readonly tagsService: TagsService,
    @Inject(forwardRef(() => FieldsService))
    private readonly fieldService: FieldsService,
  ) {
    super(repo);
  }

  /**
   * @description
   * @param {*} data
   * @param {User} user
   * @returns
   * @memberof ArticleService
   */
  public async createMany(data: any, user: User) {
    Object.assign(data, { author: user });
    if (data.type === 'article') {
      data.category = await this.cateService.getOne(data.category);
    }
    data.tags = await this.tagsService.findOrCreate(data.tags);
    const result = await this.repo.save(this.repo.create(data));
    return result;
  }

  /**
   * @description
   * @param {string} id
   * @param {*} data
   * @returns
   * @memberof ArticleService
   */
  public async updateMany(id: string, data: any) {
    const result = await this.repo.findOne({ id });
    if (!result) {
      throw new NotFoundException(`文章不存在`);
    }
    if (data.type === 'article') {
      data.category = await this.cateService.getOne(data.category);
    }
    data.tags = await this.tagsService.findOrCreate(data.tags);
    data.fields = await this.fieldService.findOrCreate(data.fields);
    return await this.repo.save(Object.assign(result, data));
  }
}
