import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../shared/base/base.controller';
import { Links } from '../../database/entity/links.entity';
import { LinksService } from './links.service';
import { BaseDto } from '../../shared/base/base.dto';
import { NewLinksInput, UpdateLinksInput } from './links.dto';

@Controller('links')
export class LinksController extends BaseController<Links> {
  constructor(protected readonly service: LinksService) {
    super(service);
  }

  @Post()
  public async createOne(@Body() data: NewLinksInput) {
    return await this.service.createOne(data);
  }

  @Put(':id')
  public async updateOne(
    @Param() { id }: BaseDto,
    @Body() data: UpdateLinksInput,
  ): Promise<Links> {
    return await this.service.updateOne(id, data);
  }
}
