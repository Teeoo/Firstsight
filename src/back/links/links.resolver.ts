import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagsService } from '../tags/tags.service';
import { ObjectType } from 'type-graphql';
import { BasePaginate } from '../../shared/base/base.paginate';
import { Links } from '../../database/entity/links.entity';
import { BaseResolver } from '../../shared/base/base.resolver';
import { LinksService } from './links.service';
import { BaseDto } from '../../shared/base/base.dto';
import { NewLinksInput, UpdateLinksInput } from './links.dto';

@ObjectType()
export class LinksPaginate extends BasePaginate(Links) {}

@Resolver('Links')
export class LinksResolver extends BaseResolver(Links, LinksPaginate) {
  constructor(protected readonly service: LinksService) {
    super(service);
  }

  @Mutation(() => Links)
  public async newLinks(
    @Args('data') data: NewLinksInput,
  ): Promise<Links | Links[]> {
    return await this.service.createOne(data);
  }

  @Mutation(() => Links)
  public async updateLinks(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateLinksInput,
  ): Promise<Links> {
    return await this.service.updateOne(id, data);
  }
}
