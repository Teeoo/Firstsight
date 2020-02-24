import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryResolver } from './category.resolver'
import { LibCategoryModule } from '@app/category'

@Module({
  imports: [LibCategoryModule],
  controllers: [CategoryController],
  providers: [CategoryResolver],
})
export class CategoryModule {}
