import { Module } from '@nestjs/common'
import { LibsAuthModule } from '@app/auth'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [LibsAuthModule],
  controllers: [AuthController],
  providers: [AuthResolver],
})
export class AuthModule {}
