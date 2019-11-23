import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from '../../database/entity/tags.entity';

@Injectable()
export class TagsService extends BaseService<Tags> {
  constructor(
    @InjectRepository(Tags)
    protected readonly repo: TreeRepository<Tags>,
  ) {
    super(repo);
  }
}
