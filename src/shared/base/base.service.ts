import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeleteResult, TreeRepository, ObjectLiteral } from 'typeorm';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Pagination } from './base.dto';

@Injectable()
export abstract class BaseService<T> {
  private logger = new Logger(this.entityType.name);

  protected constructor(protected repo: TreeRepository<T>) {}

  public get findOne(): TreeRepository<T>['findOne'] {
    return this.repo.findOne.bind(this.repo);
  }

  public get find(): TreeRepository<T>['find'] {
    return this.repo.find.bind(this.repo);
  }

  public get count(): TreeRepository<T>['count'] {
    return this.repo.count.bind(this.repo);
  }

  private get entityType(): ClassType<T> {
    return this.repo.target as ClassType<T>;
  }

  private get alias(): string {
    return this.repo.metadata.targetName;
  }

  /**
   * 批量删除
   * @param ids
   */
  public async deleteMany(ids: string): Promise<DeleteResult> {
    return await this.repo.delete(ids.split(','));
  }

  /**
   * 获取分页数据
   * @param options
   */
  public async getMany(
    options: Pagination,
    order?: any,
    where?: Partial<T> | ObjectLiteral | string,
  ): Promise<{
    data: T[];
    total: number;
    limit: number;
    page: number;
    count: number;
  }> {
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
      limit: options.limit,
      page,
      count: Math.ceil(total / options.limit),
    };
  }

  /**
   * 获取单条数据
   * @param id
   */
  public async getOne(id: string) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('数据不存在');
    }
    return result;
  }

  /**
   * 获取树形数据
   */
  public async getTrees(): Promise<T[]> {
    const result = await this.repo.findTrees();
    return result;
  }

  /**
   * 创建一条数据
   * @param data
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
   * 修改数据
   * @param id
   * @param data
   */
  public async updateOne(id: string, data: any) {
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
   * 删除单条数据
   * @param id
   */
  public async deleteOne(id: string): Promise<T> {
    const result = await this.getOne(id);
    if (result) {
      return await this.repo.remove(result);
    }
  }

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
