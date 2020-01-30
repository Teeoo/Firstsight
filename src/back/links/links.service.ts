import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/shared';
import { Links } from '@app/databases/entity/Links';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Category } from '@app/databases/entity/Category';

@Injectable()
export class LinksService extends BaseService<Links> {
  constructor(
    @InjectRepository(Links)
    protected readonly repo: TreeRepository<Links>,
  ) {
    super(repo);
  }
}
