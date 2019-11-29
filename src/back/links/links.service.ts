import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Links } from '../../database/entity/links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

@Injectable()
export class LinksService extends BaseService<Links> {
  /**
   * Creates an instance of LinksService.
   * @param {TreeRepository<Links>} repo
   * @memberof LinksService
   */
  constructor(
    @InjectRepository(Links) protected readonly repo: TreeRepository<Links>,
  ) {
    super(repo);
  }
}
