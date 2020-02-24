import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common'
import { CrudService } from '@app/core/crud/crud.service'
import { Article } from './article.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { CategoryService } from '@app/category'
import { TagsService } from '@app/tags'
import { FieldsService } from '@app/fields'
import { User } from '@app/auth/auth.entity'

@Injectable()
export class ArticleService extends CrudService<Article> {
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
    super(repo)
  }
  /**
   * @description 创建文章
   * @author lee
   * @date 2020-01-20
   * @param {*} data
   * @param {User} user
   * @returns {Promise<Article[]>}
   * @memberof ArticleService
   */
  public async createMany(data: any, user: User): Promise<Article[]> {
    Object.assign(data, { author: user })
    if (data.type === 'article') {
      data.category = await this.cateService.getOne(data.category)
    }
    data.tags = await this.tagsService.findOrCreate(data.tags)
    const result = await this.repo.save(this.repo.create(data))
    return result
  }

  /**
   * @description 修改文章
   * @author lee
   * @date 2020-01-20
   * @param {string} id
   * @param {*} data
   * @returns {Promise<User>}
   * @memberof ArticleService
   */
  public async updateMany(id: string, data: any): Promise<Article> {
    const result = await this.repo.findOne({ id })
    if (!result) {
      throw new NotFoundException('文章不存在')
    }
    if (data.type === 'article') {
      data.category = await this.cateService.getOne(data.category)
    }
    data.tags = await this.tagsService.findOrCreate(data.tags)
    data.fields = await this.fieldService.findOrCreate(data.fields)
    return await this.repo.save(Object.assign(result, data))
  }
}
