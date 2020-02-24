import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { ObjectType } from 'type-graphql'
import { Tags } from '@app/tags/tags.entity'
import { CrudPaginate } from '@app/core/crud/crud.paginate'
import { CrudResolver } from '@app/core/crud/crud.resolver'
import { TagsService } from '@app/tags'
import { NewTagsInput, UpdateTagsInput } from '@app/tags/tags.dto'
import { BaseDto } from '@app/core/crud/crud.dto'

@ObjectType()
export class TagsPaginate extends CrudPaginate(Tags) {}

@Resolver('Tags')
export class TagsResolver extends CrudResolver(Tags, TagsPaginate) {
  /**
   * Creates an instance of TagsResolver.
   * @author lee
   * @date 2020-01-20
   * @param {TagsService} service
   * @memberof TagsResolver
   */
  constructor(protected readonly service: TagsService) {
    super(service)
  }

  /**
   * @description newTags
   * @author lee
   * @date 2020-01-20
   * @param {NewTagsInput} data
   * @returns {(Promise<Tags | Tags[]>)}
   * @memberof TagsResolver
   */
  @Mutation(() => Tags, {
    description: `Create a new ${Tags.name}`,
  })
  public async newTags(
    @Args('data') data: NewTagsInput,
  ): Promise<Tags | Tags[]> {
    return await this.service.createOne(data)
  }

  /**
   * @description updateTags
   * @author lee
   * @date 2020-01-20
   * @param {BaseDto} { id }
   * @param {UpdateTagsInput} data
   * @returns {Promise<Tags>}
   * @memberof TagsResolver
   */
  @Mutation(() => Tags, {
    description: `Modify ${Tags.name} based on id`,
  })
  public async updateTags(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateTagsInput,
  ): Promise<Tags> {
    return await this.service.updateOne(id, data)
  }
}
