import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { LinksResolver } from './links.resolver';

@Module({
  providers: [LinksService, LinksResolver],
  controllers: [LinksController],
  exports: [LinksService],
})
export class LinksModule {}
