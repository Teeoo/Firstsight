import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { ObjectType } from 'type-graphql'
import { Fields } from '@app/fields/fields.entity'
import { CrudPaginate } from '@app/core/crud/crud.paginate'
import { CrudResolver } from '@app/core/crud/crud.resolver'
import { FieldsService } from '@app/fields'
import { NewFieldsInput, UpdateFieldsInput } from '@app/fields/fields.dto'
import { BaseDto } from '@app/core/crud/crud.dto'

@ObjectType({ description: `${Fields.name}  Paginate` })
export class FieldsPaginate extends CrudPaginate(Fields) {}

@Resolver('Fields')
export class FieldsResolver extends CrudResolver(Fields, FieldsPaginate) {
  constructor(protected readonly service: FieldsService) {
    super(service)
  }

  @Mutation(() => Fields, {
    description: `Create a new ${Fields.name}`,
  })
  public async newFields(
    @Args('data') data: NewFieldsInput,
  ): Promise<Fields | Fields[]> {
    const result = await this.service.createOne(data)
    return result
  }

  @Mutation(() => Fields, {
    description: `
        Modify ${Fields.name} based on id`,
  })
  public async updateFields(
    @Args() { id }: BaseDto,
    @Args('data') data: UpdateFieldsInput,
  ): Promise<Fields> {
    const result = await this.service.updateOne(id, data)
    return result
  }
}
