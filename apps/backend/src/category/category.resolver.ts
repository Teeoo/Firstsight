import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { ObjectType } from 'type-graphql'
import { UseGuards } from '@nestjs/common'
import { CrudResolver } from '@app/core/crud/crud.resolver'
import { Category } from '@app/category/category.entity'
import { CategoryService } from '@app/category'
import {
  NewCategoryInput,
  UpdateCategoryInput,
} from '@app/category/category.dto'
import { BaseDto } from '@app/core/crud/crud.dto'
import { CrudPaginate } from '@app/core/crud/crud.paginate'
import { JwtAuth } from '@app/shared/guard/auth.guard'

@ObjectType({ description: `${Category.name}  Paginate` })
export class CategoryPaginate extends CrudPaginate(Category) {}

@UseGuards(new JwtAuth())
@Resolver('Category')
export class CategoryResolver extends CrudResolver(Category, CategoryPaginate) {
  constructor(protected readonly service: CategoryService) {
    super(service)
  }

  @Query(() => [Category], {
    description: `Query tree ${Category.name} data`,
  })
  public async getTreeCategory(): Promise<Category[]> {
    return await this.service.getTrees()
  }

  @Mutation(() => Category, {
    description: `Create a new ${Category.name}`,
  })
  public async newCategory(
    @Args('data') data: NewCategoryInput,
  ): Promise<Category | Category[]> {
    const result = await this.service.createOne(data)
    return result
  }

  @Mutation(() => Category, {
    description: `
    Modify category ${Category.name} based on id`,
  })
  public async updateCategory(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    const result = await this.service.updateOne(id, data)
    return result
  }
}
