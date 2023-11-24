import { Module } from '@nestjs/common';
import { RequestIdModule } from '../../lib';
import { RequestIdFormatType } from '../../lib/requestid.enum';
import { RANDOM_EDITED_LENGTH } from '../config/test.config';
import { ApplicationController } from './app.controller';
import { ApplicationService } from './app.service';

@Module({
  imports: [
    RequestIdModule.register({
      type: RequestIdFormatType.RANDOM,
      length: RANDOM_EDITED_LENGTH,
    }),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModuleWithRandomLength {}
