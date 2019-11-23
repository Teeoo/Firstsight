import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ClassType } from 'class-transformer/ClassTransformer';

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
   * 获取分页数据
   * @param options
   */
  public async getMany(options: IPaginationOptions): Promise<Pagination<T>> {
    const result = await this.repo
      .createQueryBuilder('o')
      .orderBy('o.order', 'ASC')
      .cache(60000);
    return await paginate<T>(result, options);
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
}
