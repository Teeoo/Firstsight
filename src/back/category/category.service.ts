import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../database/entity/category.entity';
import { TreeRepository } from 'typeorm';
import { BaseService } from '../../shared/base/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  /**
   * Creates an instance of CategoryService.
   * @param {TreeRepository<Category>} repo
   * @memberof CategoryService
   */
  constructor(
    @InjectRepository(Category)
    protected readonly repo: TreeRepository<Category>,
  ) {
    super(repo);
  }
}
