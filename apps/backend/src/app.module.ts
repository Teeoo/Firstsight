import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from '@app/common'

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
