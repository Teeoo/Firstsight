import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver, BaseDto } from '@app/shared';
import { Tags } from '@app/databases/entity/Tags';
import { TagsService } from './tags.service';
import { NewTagsInput, UpdateTagsInput } from './tags.dto';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@app/core';

@ObjectType()
export class TagsPaginate extends BasePaginate(Tags) {}

@UseGuards(new AuthorizationGuard())
@Resolver('Tags')
export class TagsResolver extends BaseResolver(Tags, TagsPaginate) {
  /**
   * Creates an instance of TagsResolver.
   * @author lee
   * @date 2020-01-20
   * @param {TagsService} service
   * @memberof TagsResolver
   */
  constructor(protected readonly service: TagsService) {
    super(service);
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
    return await this.service.createOne(data);
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
    return await this.service.updateOne(id, data);
  }
}
