import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from '../../database/entity/links.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksController],
  providers: [LinksResolver, LinksService],
})
export class LinksModule {}
