import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackModule } from './back/back.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [BackModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
