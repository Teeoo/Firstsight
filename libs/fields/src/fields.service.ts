import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { CrudService } from '@app/core/crud/crud.service'
import { Fields } from './fields.entity'

@Injectable()
export class FieldsService extends CrudService<Fields> {
  constructor(
    @InjectRepository(Fields)
    protected readonly repo: TreeRepository<Fields>,
  ) {
    super(repo)
  }
}
