import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate } from '../../shared/base/base.paginate';
import { BaseResolver } from '../../shared/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { Auth } from '../../shared/guards/auth.guard';
import { BaseDto } from '../../shared/base/base.dto';
import { NewTagsInput, UpdateTagsInput } from './tags.dto';
import { TagsService } from './tags.service';
import { Tags } from '../../database/entity/tags.entity';

@ObjectType()
export class TagsPaginate extends BasePaginate(Tags) {}

@UseGuards(new Auth())
@Resolver('Tags')
export class TagsResolver extends BaseResolver(Tags, TagsPaginate) {
  constructor(protected readonly service: TagsService) {
    super(service);
  }

  @Mutation(() => Tags)
  public async newTags(
    @Args('data') data: NewTagsInput,
  ): Promise<Tags | Tags[]> {
    return await this.service.createOne(data);
  }

  @Mutation(() => Tags)
  public async updateTags(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateTagsInput,
  ): Promise<Tags> {
    return await this.service.updateOne(id, data);
  }
}
