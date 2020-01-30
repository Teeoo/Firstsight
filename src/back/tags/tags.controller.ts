import { Controller, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { BaseController, BaseDto } from '@app/shared';
import { Tags } from '@app/databases/entity/Tags';
import { TagsService } from './tags.service';
import { NewTagsInput, UpdateTagsInput } from './tags.dto';
import { AuthorizationGuard } from '@app/core';

@UseGuards(new AuthorizationGuard())
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
