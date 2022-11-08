import { Module } from '@nestjs/common';
import { RequestIdModule } from '../../lib';
import { ApplicationController } from './app.controller';
import { ApplicationService } from './app.service';

@Module({
  imports: [RequestIdModule.register({})],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModuleDefault {}
