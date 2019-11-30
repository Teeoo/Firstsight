import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../../shared/base/base.controller';
import { Article } from '../../database/entity/article.entity';
import { ArticleService } from './article.service';
import { Auth } from '../../shared/guards/auth.guard';

/**
 * @description
 * @export
 * @class ArticleController
 * @extends {BaseController<Article>}
 */
@UseGuards(new Auth())
@Controller('article')
export class ArticleController extends BaseController<Article> {
  /**
   * Creates an instance of ArticleController.
   * @param {ArticleService} service
   * @memberof ArticleController
   */
  constructor(protected readonly service: ArticleService) {
    super(service);
  }
}
