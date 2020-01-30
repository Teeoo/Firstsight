import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/shared';
import { Tags } from '@app/databases/entity/Tags';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

@Injectable()
export class TagsService extends BaseService<Tags> {
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
    super(repo);
  }
}
