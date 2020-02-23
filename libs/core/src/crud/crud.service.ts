import { Logger, NotFoundException } from '@nestjs/common'
import { TreeRepository, ObjectLiteral, DeleteResult } from 'typeorm'
import { ClassType } from 'class-transformer/ClassTransformer'
import { Pagination, Paginate } from './crud.dto'

/**
 * @description CRUD操作基础服务
 * @author lee
 * @date 2020-01-18
 * @export
 * @abstract
 * @class CrudService
 * @template T
 */
export abstract class CrudService<T> {
  /**
   * @description logger
   * @private
   * @memberof CrudService
   */
  private logger = new Logger(this.entityType.name)

  /**
   * Creates an instance of CrudService.
   * @author lee
   * @date 2020-01-18
   * @param {TreeRepository<T>} repo
   * @memberof CrudService
   */
  protected constructor(protected repo: TreeRepository<T>) {}

  /**
   * @description findOne
   * @readonly
   * @type {TreeRepository<T>['findOne']}
   * @memberof CrudService
   */
  public get findOne(): TreeRepository<T>['findOne'] {
    return this.repo.findOne.bind(this.repo)
  }

  /**
   * @description find
   * @readonly
   * @type {TreeRepository<T>['find']}
   * @memberof CrudService
   */
  public get find(): TreeRepository<T>['find'] {
    return this.repo.find.bind(this.repo)
  }

  /**
   * @description count
   * @readonly
   * @type {TreeRepository<T>['count']}
   * @memberof CrudService
   */
  public get count(): TreeRepository<T>['count'] {
    return this.repo.count.bind(this.repo)
  }

  /**
   * @description entityType
   * @readonly
   * @private
   * @type {ClassType<T>}
   * @memberof CrudService
   */
  public get entityType(): ClassType<T> {
    return this.repo.target as ClassType<T>
  }

  /**
   * @description alias
   * @readonly
   * @private
   * @type {string}
   * @memberof CrudService
   */
  private get alias(): string {
    return this.repo.metadata.targetName
  }

  /**
   * @description 批量删除
   * @date 2019-11-29
   * @param {string} ids
   * @returns {Promise<DeleteResult>}
   * @memberof CrudService
   */
  public async deleteMany(ids: string): Promise<DeleteResult> {
    return await this.repo.delete(ids.split(','))
  }

  /**
   * @description 获取全部数据 不包含分页
   * @author lee
   * @date 2020-01-18
   * @param {({
   *       [P in keyof T]?: "ASC" | "DESC" | 1 | -1;
   *     })} [order]
   * @param {(Partial<T> | ObjectLiteral | string)} [where]
   * @returns
   * @memberof CrudService
   */
  public async getMany(
    order?: any,
    where?: Partial<T> | ObjectLiteral | string,
  ): Promise<T[]> {
    return await this.find({
      order,
      where,
    })
  }

  /**
   * @description 获取带分页数据
   * @author lee
   * @date 2020-01-18
   * @param {Pagination} options
   * @param {({
   *             [P in keyof T]?: "ASC" | "DESC" | 1 | -1;
   *         })} [order]
   * @param {(Partial<T> | ObjectLiteral | string)} [where]
   * @returns {Promise<Paginate<T>>}
   * @memberof CrudService
   */
  public async paginator(
    options: Pagination,
    order?: any,
    where?: Partial<T> | ObjectLiteral | string,
  ): Promise<Paginate<T>> {
    const page =
      options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page
    const [data, total] = await this.repo.findAndCount({
      take: options.limit,
      skip: page * options.limit,
      cache: false,
      order,
      where,
    })
    return {
      data,
      total,
      // eslint-disable-next-line @typescript-eslint/camelcase
      per_page: data.length,
      // eslint-disable-next-line @typescript-eslint/camelcase
      current_page: page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      last_page: Math.ceil(total / options.limit),
    }
  }

  /**
   * @description 获取单条数据
   * @date 2019-11-29
   * @param {string} id
   * @returns {Promise<Partial<T>>}
   * @memberof CrudService
   */
  public async getOne(id: string): Promise<T> {
    const result = await this.findOne(id)
    if (!result) {
      throw new NotFoundException('数据不存在')
    }
    return result
  }

  /**
   * @description tree
   * @date 2019-11-29
   * @returns {Promise<T[]>}
   * @memberof CrudService
   */
  public async getTrees(): Promise<T[]> {
    const result = await this.repo.findTrees()
    return result
  }

  /**
   * @description 创建一条数据
   * @date 2019-11-29
   * @param {*} data
   * @returns {(Promise<T[] | Partial<T[]>>)}
   * @memberof CrudService
   */
  public async createOne(data: any): Promise<T[] | Partial<T[]>> {
    if (!data.parent) {
      return await this.repo.save(this.repo.create(data))
    } else {
      const parent = await this.repo.findOne(data.parent)
      if (!parent) {
        throw new NotFoundException('没有找到父级哦!')
      }
      const children: any = this.repo.create(data)
      children.parent = parent
      const result = await this.repo.save(children)
      return result
    }
  }

  /**
   * @description 修改数据
   * @param {string} id
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof CrudService
   */
  public async updateOne(id: string, data: any): Promise<T> {
    const result: any = await this.repo.findOne(id)
    if (!result) {
      throw new NotFoundException('数据不存在')
    }
    if (!data.parent) {
      return this.repo.save(Object.assign(result, data))
    } else {
      const parent = await this.repo.findOne(data.parent)
      if (!parent) {
        throw new NotFoundException('没有找到父级数据哦!')
      }
      result.parent = parent
      return await this.repo.save(Object.assign(result, data))
    }
  }

  /**
   * @description 删除单条数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof CrudService
   */
  public async deleteOne(id: string): Promise<T> {
    const result = await this.getOne(id)
    if (result) {
      return await this.repo.remove(result)
    }
  }

  /**
   * @description findOrCreate
   * @template E
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof CrudService
   */
  public async findOrCreate<E>(data: any): Promise<T>
  public async findOrCreate(data: any): Promise<any> {
    if (!data) {
      return null
    }
    const attr: Array<T | Promise<T[]>> = []
    for (const iterator of data) {
      const record = await this.findOne({
        where: [iterator],
      })
      if (!record) {
        const rest: any = await this.repo.save(this.repo.create(iterator))
        attr.push(rest)
      } else {
        attr.push(record)
      }
    }
    return attr
  }

  /**
   * @description firstOrCreate
   * @template E
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof CrudService
   */
  public async firstOrCreate<E>(data: any): Promise<T>
  public async firstOrCreate(data: any): Promise<any> {
    const record = await this.findOne({
      where: [data],
    })
    if (!record) {
      return this.repo.save(this.repo.create(data))
    }
    return record
  }
}
