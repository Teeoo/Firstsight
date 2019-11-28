import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from '../../database/entity/category.entity';
import { BaseResolver } from '../../shared/base/base.resolver';
import { ObjectType, PubSubEngine } from 'type-graphql';
import { BasePaginate } from '../../shared/base/base.paginate';
import { NewCategoryInput, UpdateCategoryInput } from './category.dto';
import { UseGuards, Inject } from '@nestjs/common';
import { Auth } from '../../shared/guards/auth.guard';
import { BaseDto } from '../../shared/base/base.dto';

@ObjectType({ description: `CategoryPaginate` })
export class CategoryPaginate extends BasePaginate(Category) {}

@UseGuards(new Auth())
@Resolver('Category')
export class CategoryResolver extends BaseResolver(Category, CategoryPaginate) {
  public EVENT_NAME = `OnChange${Category.name}`;

  constructor(
    protected readonly service: CategoryService,
    @Inject('REDIS_SUB') private pubSub: PubSubEngine,
  ) {
    super(service, pubSub);
  }

  @Query(() => [Category])
  public async getCategoryTree(): Promise<Category[]> {
    return await this.service.getTrees();
  }

  @Mutation(() => Category)
  public async newCategory(
    @Args('data') data: NewCategoryInput,
  ): Promise<Category | Category[]> {
    const result = await this.service.createOne(data);
    await this.pubSub.publish(this.EVENT_NAME, {
      [this.EVENT_NAME]: await this.service.getMany({ limit: 10, page: 1 }),
    });
    return result;
  }

  @Mutation(() => Category)
  public async updateCategory(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    const result = await this.service.updateOne(id, data);
    await this.pubSub.publish(this.EVENT_NAME, {
      [this.EVENT_NAME]: await this.service.getMany({ limit: 10, page: 1 }),
    });
    return result;
  }
}
