import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { Category } from '@app/databases/entity/Category';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { BasePaginate, BaseResolver, BaseDto } from '@app/shared';
import { AuthorizationGuard } from '@app/core';
import { NewCategoryInput, UpdateCategoryInput } from './category.dto';

@ObjectType({ description: `${Category.name}  Paginate` })
export class CategoryPaginate extends BasePaginate(Category) {}

@UseGuards(new AuthorizationGuard())
@Resolver('Category')
export class CategoryResolver extends BaseResolver(Category, CategoryPaginate) {
  constructor(protected readonly service: CategoryService) {
    super(service);
  }

  @Query(() => [Category], {
    description: `Query tree ${Category.name} data`,
  })
  public async getTreeCategory(): Promise<Category[]> {
    return await this.service.getTrees();
  }

  @Mutation(() => Category, {
    description: `Create a new ${Category.name}`,
  })
  public async newCategory(
    @Args('data') data: NewCategoryInput,
  ): Promise<Category | Category[]> {
    const result = await this.service.createOne(data);
    return result;
  }

  @Mutation(() => Category, {
    description: `
    Modify category ${Category.name} based on id`,
  })
  public async updateCategory(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    const result = await this.service.updateOne(id, data);
    return result;
  }
}
