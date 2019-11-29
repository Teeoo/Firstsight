import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeleteResult, TreeRepository, ObjectLiteral } from 'typeorm';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Pagination, Paginate } from './base.dto';

/**
 * @description
 * @date 2019-11-29
 * @class BaseService
 * @template T
 */
@Injectable()
export abstract class BaseService<T> {
  private logger = new Logger(this.entityType.name);

  /**
   * Creates an instance of BaseService.
   * @date 2019-11-29
   * @param {TreeRepository<T>} repo
   * @memberof BaseService
   */
  protected constructor(protected repo: TreeRepository<T>) {}

  /**
   * @description findOne
   * @readonly
   * @type {TreeRepository<T>['findOne']}
   * @memberof BaseService
   */
  public get findOne(): TreeRepository<T>['findOne'] {
    return this.repo.findOne.bind(this.repo);
  }

  /**
   * @description find
   * @readonly
   * @type {TreeRepository<T>['find']}
   * @memberof BaseService
   */
  public get find(): TreeRepository<T>['find'] {
    return this.repo.find.bind(this.repo);
  }

  /**
   * @description count
   * @readonly
   * @type {TreeRepository<T>['count']}
   * @memberof BaseService
   */
  public get count(): TreeRepository<T>['count'] {
    return this.repo.count.bind(this.repo);
  }

  /**
   * @description entityType
   * @readonly
   * @private
   * @type {ClassType<T>}
   * @memberof BaseService
   */
  private get entityType(): ClassType<T> {
    return this.repo.target as ClassType<T>;
  }

  /**
   * @description alias
   * @readonly
   * @private
   * @type {string}
   * @memberof BaseService
   */
  private get alias(): string {
    return this.repo.metadata.targetName;
  }

  /**
   * @description 批量删除
   * @date 2019-11-29
   * @param {string} ids
   * @returns {Promise<DeleteResult>}
   * @memberof BaseService
   */
  public async deleteMany(ids: string): Promise<DeleteResult> {
    return await this.repo.delete(ids.split(','));
  }

  /**
   * @description 获取分页数据
   * @date 2019-11-29
   * @param {Pagination} options
   * @param {*} [order]
   * @param {(Partial<T> | ObjectLiteral | string)} [where]
   * @returns {Promise<Paginate>}
   * @memberof BaseService
   */
  public async getMany(
    options: Pagination,
    order?: any,
    where?: Partial<T> | ObjectLiteral | string,
  ): Promise<Paginate> {
    const page =
      options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;

    const [data, total] = await this.repo.findAndCount({
      take: options.limit,
      skip: page * options.limit,
      cache: 60000,
      order,
    });

    return {
      data,
      total,
      per_page: data.length,
      current_page: page,
      last_page: Math.ceil(total / options.limit),
    };
  }

  /**
   * @description 获取单条数据
   * @date 2019-11-29
   * @param {string} id
   * @returns {Promise<Partial<T>>}
   * @memberof BaseService
   */
  public async getOne(id: string): Promise<T> {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('数据不存在');
    }
    return result;
  }

  /**
   * @description tree
   * @date 2019-11-29
   * @returns {Promise<T[]>}
   * @memberof BaseService
   */
  public async getTrees(): Promise<T[]> {
    const result = await this.repo.findTrees();
    return result;
  }

  /**
   * @description 创建一条数据
   * @date 2019-11-29
   * @param {*} data
   * @returns {(Promise<T[] | Partial<T[]>>)}
   * @memberof BaseService
   */
  public async createOne(data: any): Promise<T[] | Partial<T[]>> {
    if (!data.parent) {
      return await this.repo.save(this.repo.create(data));
    } else {
      const parent = await this.repo.findOne(data.parent);
      if (!parent) {
        throw new NotFoundException('没有找到父级分类哦!');
      }
      const children: any = this.repo.create(data);
      children.parent = parent;
      const result = await this.repo.save(children);
      return result;
    }
  }

  /**
   * @description 修改数据
   * @param {string} id
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async updateOne(id: string, data: any): Promise<T> {
    const result: any = await this.repo.findOne(id);
    if (!result) {
      throw new NotFoundException('数据不存在');
    }
    if (!data.parent) {
      return this.repo.save(Object.assign(result, data));
    } else {
      const parent = await this.repo.findOne(data.parent);
      if (!parent) {
        throw new NotFoundException('没有找到父级分类哦!');
      }
      result.parent = parent;
      return await this.repo.save(Object.assign(result, data));
    }
  }

  /**
   * @description 删除单条数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async deleteOne(id: string): Promise<T> {
    const result = await this.getOne(id);
    if (result) {
      return await this.repo.remove(result);
    }
  }

  /**
   * @description findOrCreate
   * @template E
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async findOrCreate<E>(data: any): Promise<T>;
  public async findOrCreate(data: any): Promise<any> {
    if (!data) {
      return null;
    }
    const attr: Array<T | Promise<T[]>> = [];
    for (const iterator of data) {
      const record = await this.findOne({
        where: [iterator],
      });
      if (!record) {
        const rest: any = await this.repo.save(this.repo.create(iterator));
        attr.push(rest);
      } else {
        attr.push(record);
      }
    }
    return attr;
  }

  /**
   * @description firstOrCreate
   * @template E
   * @param {*} data
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async firstOrCreate<E>(data: any): Promise<T>;
  public async firstOrCreate(data: any): Promise<any> {
    const record = await this.findOne({
      where: [data],
    });
    if (!record) {
      return this.repo.save(this.repo.create(data));
    }
    return record;
  }
}
