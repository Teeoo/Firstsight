import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { BaseService } from './base.service';
import { ClassType } from 'type-graphql';
import { BaseDto } from './base.dto';
import { GetRecipesArgs } from './base.args';

/**
 * @description BaseResolver
 * @export
 * @template E
 * @template P
 * @param {E} EntityClass
 * @param {P} Paginates
 * @returns {*}
 */
export function BaseResolver<E extends ClassType, P extends ClassType>(
  EntityClass: E,
  Paginates: P,
): any {
  const EVENT_NAME = `OnChange${EntityClass.name}`;
  /**
   * @description Resolvers
   * @abstract
   * @class Resolvers
   */
  abstract class Resolvers {
    protected constructor(
      protected service: BaseService<E>,
      protected readonly pubSub,
    ) {}

    /**
     * @description getMany
     * @param {GetRecipesArgs} { limit, page }
     * @returns
     * @memberof Resolvers
     */
    @Query(() => Paginates, {
      name: `all${EntityClass.name}`,
      description: `Get multiple **${EntityClass.name}**`,
    })
    public async getMany(@Args() { limit, page }: GetRecipesArgs) {
      return await this.service.getMany({ limit, page });
    }

    /**
     * @description getOne
     * @param {BaseDto} { id }
     * @returns {Promise<Partial<E>>}
     * @memberof Resolvers
     */
    @Query(() => EntityClass, {
      name: `one${EntityClass.name}`,
    })
    public async getOne(@Args() { id }: BaseDto): Promise<Partial<E>> {
      return await this.service.getOne(id);
    }

    /**
     * @description deleteOne
     * @param {BaseDto} { id }
     * @returns {Promise<boolean>}
     * @memberof Resolvers
     */
    @Mutation(() => Boolean, {
      name: `delete${EntityClass.name}`,
    })
    public async deleteOne(@Args() { id }: BaseDto): Promise<boolean> {
      const result = await this.service.getMany({ limit: 10, page: 1 });
      await this.pubSub.publish(EVENT_NAME, { [EVENT_NAME]: result });
      return (await this.service.deleteOne(id)) ? true : false;
    }

    /**
     * @description OnChange
     * @returns
     * @memberof Resolvers
     */
    @Subscription(() => Paginates, {
      nullable: true,
      name: EVENT_NAME,
    })
    public OnChange() {
      return this.pubSub.asyncIterator(EVENT_NAME);
    }

    // TODO:获取不到DTO的class,这里暂时不做新增修改之类的操作
    // @Mutation(() => EntityClass, {
    //   name: `new${EntityClass.name}`,
    //   description: `Create one ${EntityClass.name}`,
    // })
    // public async CreateOne(@Args({ name: 'data', type: () => Dto }) data: D) {
    //   this.logger.debug(data);
    //   return await this.service.CreateOne(data);
    // }
  }

  return Resolvers;
}
