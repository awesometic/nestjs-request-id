import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApplicationService } from './app.service';

@Controller()
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Get('/what-is-my-request-id-type')
  @HttpCode(200)
  public whatIsMyRequestIdType() {
    return this.appService.getRequestIdType();
  }

  @Get('/what-is-my-request-id')
  @HttpCode(200)
  public whatIsMyRequestId() {
    return this.appService.getRequestId();
  }
}
