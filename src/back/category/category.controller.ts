import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../../database/entity/category.entity';
import { Auth } from '../../shared/guards/auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BaseController } from '../../shared/base/base.controller';
import { NewCategoryInput, UpdateCategoryInput } from './category.dto';
import { ClassType } from 'type-graphql';
import { BaseDto } from '../../shared/base/base.dto';

@UseGuards(new Auth())
@Controller('category')
export class CategoryController extends BaseController<Category> {
  constructor(protected readonly service: CategoryService) {
    super(service);
  }

  @Get('tree')
  public async getTree() {
    return await this.service.getTrees();
  }

  @Post()
  public async createOne(@Body() data: NewCategoryInput) {
    return await this.service.createOne(data);
  }

  @Put(':id')
  public async updateOne(
    @Param() { id }: BaseDto,
    @Body() data: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.service.updateOne(id, data);
  }
}
