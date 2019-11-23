import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../database/entity/category.entity';
import { TreeRepository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { BaseService } from '../../shared/base/base.service';
import { UpdateCategoryInput } from './category.dto';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repo: TreeRepository<Category>,
  ) {
    super(repo);
  }
}
