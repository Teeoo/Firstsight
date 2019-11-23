import { BaseService } from './base.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BaseDto } from './base.dto';
import { DeleteResult } from 'typeorm';

@Controller()
export abstract class BaseController<T> {
  protected constructor(protected service: BaseService<T>) {}

  // TODO:获取不到TDO的class,这里暂时不做新增修改之类的操作

  @Get()
  public async getMany(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.service.getMany({ page, limit, route: '' });
  }

  @Get(':id')
  public async getOne(@Param() { id }: BaseDto): Promise<T> {
    return this.service.getOne(id);
  }

  @Delete(':id')
  public deleteOne(@Param() { id }: BaseDto) {
    return this.service.deleteOne(id);
  }
}
