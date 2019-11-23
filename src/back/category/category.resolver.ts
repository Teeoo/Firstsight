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
    return await this.service.createOne(data);
  }

  @Mutation(() => Category)
  public async updateCategory(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.service.updateOne(id, data);
  }
}
