import { Module } from '@nestjs/common'
import { LinksController } from './links.controller'
import { LinksResolver } from './links.resolver'
import { LibLinksModule } from '@app/links'

@Module({
  imports: [LibLinksModule],
  controllers: [LinksController],
  providers: [LinksResolver],
})
export class LinksModule {}
