import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from '@app/common'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [CommonModule, AuthModule, CategoryModule],
})
export class AppModule {}
