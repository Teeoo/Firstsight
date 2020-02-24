import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { CrudService } from '@app/core/crud/crud.service'
import { Links } from './links.entity'

@Injectable()
export class LinksService extends CrudService<Links> {
  constructor(
    @InjectRepository(Links)
    protected readonly repo: TreeRepository<Links>,
  ) {
    super(repo)
  }
}
