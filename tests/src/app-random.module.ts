import { Module } from '@nestjs/common';
import { RequestIdModule } from '../../lib';
import { RequestIdFormatType } from '../../lib/requestid.enum';
import { ApplicationController } from './app.controller';
import { ApplicationService } from './app.service';

@Module({
  imports: [RequestIdModule.register({ type: RequestIdFormatType.RANDOM })],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModuleWithRandom {}
