import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { BaseService } from './base.service';
import { ClassType } from 'type-graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { GetRecipesArgs } from './base.args';
import { BaseDto } from './base.dto';

export function BaseResolver<E extends ClassType, P extends ClassType>(
  EntityClass: E,
  Paginates: P,
): any {
  const EVENT_NAME = `OnChange${EntityClass.name}`;
  abstract class Resolvers {
    protected constructor(
      protected service: BaseService<E>,
      protected readonly pubSub,
    ) {}

    @Query(() => Paginates, {
      name: `all${EntityClass.name}`,
      description: `Get multiple **${EntityClass.name}**`,
    })
    public async getMany(
      @Args() { limit, page, route }: GetRecipesArgs,
    ): Promise<Pagination<E>> {
      return await this.service.getMany({ limit, page, route });
    }

    @Query(() => EntityClass, {
      name: `one${EntityClass.name}`,
    })
    public async getOne(@Args() { id }: BaseDto): Promise<E> {
      return await this.service.getOne(id);
    }

    @Mutation(() => Boolean, {
      name: `delete${EntityClass.name}`,
    })
    public async deleteOne(@Args() { id }: BaseDto): Promise<boolean> {
      const result = await this.service.getMany({ limit: 10, page: 1 });
      await this.pubSub.publish(EVENT_NAME, { [EVENT_NAME]: result });
      return (await this.service.deleteOne(id)) ? true : false;
    }
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
