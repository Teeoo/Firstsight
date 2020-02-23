import { Controller, Delete, Get, Param, Query } from '@nestjs/common'
import { CrudService } from './crud.service'
import { Paginate, BaseDto } from './crud.dto'

@Controller()
export abstract class CrudController<T> {
  protected constructor(protected service: CrudService<T>) {}

  /**
   * @description
   * @author lee
   * @date 2020-01-20
   * @param {number} [page]
   * @param {number} [limit]
   * @param {*} [query]
   * @param {*} [sort]
   * @returns {(Promise<Partial<T> | Paginate<T> | T[]>)}
   * @memberof CrudController
   */
  @Get()
  public async getMany(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
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
        )
  }

  /**
   * @description getOne
   * @param {BaseDto} { id }
   * @returns {Promise<Partial<T>>}
   * @memberof CrudController
   */
  @Get(':id')
  public async getOne(@Param() { id }: BaseDto): Promise<Partial<T>> {
    return this.service.getOne(id)
  }

  /**
   * @description deleteOne
   * @param {BaseDto} { id }
   * @returns
   * @memberof CrudController
   */
  @Delete(':id')
  public deleteOne(@Param() { id }: BaseDto) {
    return this.service.deleteOne(id)
  }
}
