import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Auth } from '../../shared/guards/auth.guard';
import { BaseController } from '../../shared/base/base.controller';
import { BaseDto } from '../../shared/base/base.dto';
import { NewTagsInput, UpdateTagsInput } from './tags.dto';
import { TagsService } from './tags.service';
import { Tags } from '../../database/entity/tags.entity';

@Controller('tags')
export class TagsController extends BaseController<Tags> {
  constructor(protected readonly service: TagsService) {
    super(service);
  }

  @Post()
  public async createOne(@Body() data: NewTagsInput) {
    return await this.service.createOne(data);
  }

  @Put(':id')
  public async updateOne(
    @Param() { id }: BaseDto,
    @Body() data: UpdateTagsInput,
  ): Promise<Tags> {
    return await this.service.updateOne(id, data);
  }
}
