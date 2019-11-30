import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../../database/entity/category.entity';
import { Auth } from '../../shared/guards/auth.guard';
import { BaseController } from '../../shared/base/base.controller';
import { NewCategoryInput, UpdateCategoryInput } from './category.dto';
import { BaseDto } from '../../shared/base/base.dto';

/**
 * @description
 * @export
 * @class CategoryController
 * @extends {BaseController<Category>}
 */
@UseGuards(new Auth())
@Controller('category')
export class CategoryController extends BaseController<Category> {
  constructor(protected readonly service: CategoryService) {
    super(service);
  }

  /**
   * @description
   * @returns
   * @memberof CategoryController
   */
  @Get('tree')
  public async getTree() {
    return await this.service.getTrees();
  }

  /**
   * @description
   * @param {NewCategoryInput} data
   * @returns
   * @memberof CategoryController
   */
  @Post()
  public async createOne(@Body() data: NewCategoryInput) {
    return await this.service.createOne(data);
  }

  /**
   * @description
   * @param {BaseDto} { id }
   * @param {UpdateCategoryInput} data
   * @returns {Promise<Category>}
   * @memberof CategoryController
   */
  @Put(':id')
  public async updateOne(
    @Param() { id }: BaseDto,
    @Body() data: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.service.updateOne(id, data);
  }
}
