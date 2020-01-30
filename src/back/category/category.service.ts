import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@app/databases/entity/Category';
import { TreeRepository } from 'typeorm';
import { BaseService } from '@app/shared/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repo: TreeRepository<Category>,
  ) {
    super(repo);
  }
}
