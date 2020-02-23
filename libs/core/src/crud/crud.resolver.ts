import { Args, Mutation, Query } from '@nestjs/graphql'
import { ClassType } from 'type-graphql'
import { CrudService } from './crud.service'
import { Pagination, BaseDto } from './crud.dto'

/**
 * @description CrudResolver
 * @author lee
 * @date 2020-01-18
 * @export
 * @template E - 实体
 * @template P - 分页
 * @param {E} EntityClass
 * @param {P} Paginates
 * @returns {*}
 */
export function CrudResolver<E extends ClassType, P extends ClassType>(
  EntityClass: E,
  Paginates: P,
): any {
  /**
   * @description Resolvers
   * @abstract
   * @class Resolvers
   */
  abstract class Resolvers {
    protected constructor(protected service: CrudService<E>) {}
    /**
     * @description getMany
     * @param {GetRecipesArgs} { limit, page }
     * @returns
     * @memberof Resolvers
     */
    @Query(() => Paginates, {
      name: `get${EntityClass.name}Pagination`,
      description: `Query Pagination ${EntityClass.name} data`,
    })
    public async paginator(@Args() { limit, page }: Pagination) {
      return await this.service.paginator({ limit, page })
    }

    @Query(() => [EntityClass], {
      name: `getAll${EntityClass.name}`,
      description: `Query all ${EntityClass.name} data`,
    })
    public async getMany() {
      return await this.service.find()
    }

    /**
     * @description getOne
     * @param {BaseDto} { id }
     * @returns {Promise<Partial<E>>}
     * @memberof Resolvers
     */
    @Query(() => EntityClass, {
      name: `get${EntityClass.name}InfoById`,
      description: `Query ${EntityClass.name} details By Id`,
    })
    public async getOne(@Args() { id }: BaseDto): Promise<Partial<E>> {
      return await this.service.getOne(id)
    }

    /**
     * @description deleteOne
     * @param {BaseDto} { id }
     * @returns {Promise<boolean>}
     * @memberof Resolvers
     */
    @Mutation(() => Boolean, {
      name: `delete${EntityClass.name}`,
      description: `Delete a single ${EntityClass.name} based on Id`,
    })
    public async deleteOne(@Args() { id }: BaseDto): Promise<boolean> {
      await this.service.getOne(id)
      return (await this.service.deleteOne(id)) ? true : false
    }

    @Mutation(() => Boolean, {
      name: `deleteMany${EntityClass.name}`,
      description: `Delete multiple ${EntityClass.name} based on Ids`,
    })
    public async delete(@Args('ids') ids: string) {
      return !!(await this.service.deleteMany(ids))
    }
  }

  return Resolvers
}
