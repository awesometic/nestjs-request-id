import { Module } from '@nestjs/common';
import { RequestIdModule } from '../../lib';
import { RequestIdFormatType } from '../../lib/requestid.enum';
import { ApplicationController } from './app.controller';
import { ApplicationService } from './app.service';

@Module({
  imports: [RequestIdModule.register({ type: RequestIdFormatType.UUID_V1 })],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModuleWithUUIDV1 {}
