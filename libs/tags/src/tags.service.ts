import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { CrudService } from '@app/core/crud/crud.service'
import { Tags } from './tags.entity'

@Injectable()
export class TagsService extends CrudService<Tags> {
  /**
   * Creates an instance of TagsService.
   * @author lee
   * @date 2020-01-20
   * @param {TreeRepository<Tags>} repo
   * @memberof TagsService
   */
  constructor(
    @InjectRepository(Tags)
    protected readonly repo: TreeRepository<Tags>,
  ) {
    super(repo)
  }
}
