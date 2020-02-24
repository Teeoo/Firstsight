import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { CrudResolver } from '@app/core/crud/crud.resolver'
import { Links } from '@app/links/links.entity'
import { ObjectType } from 'type-graphql'
import { CrudPaginate } from '@app/core/crud/crud.paginate'
import { LinksService } from '@app/links'
import { NewLinksInput, UpdateLinksInput } from '@app/links/links.dto'
import { BaseDto } from '@app/core/crud/crud.dto'

@ObjectType({ description: `${Links.name}  Paginate` })
export class LinksPaginate extends CrudPaginate(Links) {}

@Resolver('Links')
export class LinksResolver extends CrudResolver(Links, LinksPaginate) {
  constructor(protected readonly service: LinksService) {
    super(service)
  }

  @Mutation(() => Links, {
    description: `Create a new ${Links.name}`,
  })
  public async newLinks(
    @Args('data') data: NewLinksInput,
  ): Promise<Links | Links[]> {
    const result = await this.service.createOne(data)
    return result
  }

  @Mutation(() => Links, {
    description: `
            Modify ${Links.name} based on id`,
  })
  public async updateLinks(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateLinksInput,
  ): Promise<Links> {
    const result = await this.service.updateOne(id, data)
    return result
  }
}
