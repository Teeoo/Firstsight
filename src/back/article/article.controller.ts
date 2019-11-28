import { Controller } from '@nestjs/common';
import { BaseController } from '../../shared/base/base.controller';
import { Article } from '../../database/entity/article.entity';
import { CategoryService } from '../category/category.service';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController extends BaseController<Article> {
  constructor(protected readonly service: ArticleService) {
    super(service);
  }
}
