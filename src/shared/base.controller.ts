import { BaseService } from './base.service';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { BaseDto, Paginate } from './base.dto';

@Controller()
export abstract class BaseController<T> {
  protected constructor(protected service: BaseService<T>) {}

  /**
   * @description
   * @author lee
   * @date 2020-01-20
   * @param {number} [page]
   * @param {number} [limit]
   * @param {*} [query]
   * @param {*} [sort]
   * @returns {(Promise<Partial<T> | Paginate<T> | T[]>)}
   * @memberof BaseController
   */
  @Get()
  public async getMany(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('query') query?: any,
    @Query('sort') sort?: any,
  ): Promise<Partial<T> | Paginate<T> | T[]> {
    return page || limit
      ? this.service.paginator(
          { page, limit },
          {
            order: 'ASC',
          },
          {},
        )
      : this.service.getMany(
          {
            order: 'ASC',
          },
          {},
        );
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
