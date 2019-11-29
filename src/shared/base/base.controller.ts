import { BaseService } from './base.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BaseDto } from './base.dto';
import { DeleteResult } from 'typeorm';

/**
 * @description BaseController
 * @export
 * @abstract
 * @class BaseController
 * @template T
 */
@Controller()
export abstract class BaseController<T> {
  protected constructor(protected service: BaseService<T>) {}

  // TODO:获取不到TDO的class,这里暂时不做新增修改之类的操作

  /**
   * @description getMany
   * @param {number} [page=0]
   * @param {number} [limit=10]
   * @param {*} [query]
   * @param {*} [sort]
   * @returns
   * @memberof BaseController
   */
  @Get()
  public async getMany(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('query') query?: any,
    @Query('sort') sort?: any,
  ) {
    // TODO: query 和 sort 待处理
    return this.service.getMany({ page, limit }, { order: 'ASC' });
  }

  /**
   * @description getOne
   * @param {BaseDto} { id }
   * @returns {Promise<Partial<T>>}
   * @memberof BaseController
   */
  @Get(':id')
  public async getOne(@Param() { id }: BaseDto): Promise<Partial<T>> {
    return this.service.getOne(id);
  }

  /**
   * @description deleteOne
   * @param {BaseDto} { id }
   * @returns
   * @memberof BaseController
   */
  @Delete(':id')
  public deleteOne(@Param() { id }: BaseDto) {
    return this.service.deleteOne(id);
  }
}
