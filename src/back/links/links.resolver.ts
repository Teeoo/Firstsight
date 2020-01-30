import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Links } from '@app/databases/entity/Links';
import { LinksService } from './links.service';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver, BaseDto } from '@app/shared';
import { NewLinksInput, UpdateLinksInput } from './links.dto';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@app/core';

@ObjectType({ description: `${Links.name}  Paginate` })
export class LinksPaginate extends BasePaginate(Links) {}

@UseGuards(new AuthorizationGuard())
@Resolver('Links')
export class LinksResolver extends BaseResolver(Links, LinksPaginate) {
  constructor(protected readonly service: LinksService) {
    super(service);
  }

  @Mutation(() => Links, {
    description: `Create a new ${Links.name}`,
  })
  public async newLinks(
    @Args('data') data: NewLinksInput,
  ): Promise<Links | Links[]> {
    const result = await this.service.createOne(data);
    return result;
  }

  @Mutation(() => Links, {
    description: `
        Modify ${Links.name} based on id`,
  })
  public async updateLinks(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateLinksInput,
  ): Promise<Links> {
    const result = await this.service.updateOne(id, data);
    return result;
  }
}
