import { Inject, Injectable } from '@nestjs/common';
import { RequestIdService, REQUEST_ID_TOKEN } from '../../lib';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(REQUEST_ID_TOKEN)
    private readonly requestIdService: RequestIdService,
  ) {}

  public getRequestIdType() {
    return this.requestIdService.requestIdType;
  }

  public getRequestId() {
    return this.requestIdService.requestId;
  }
}
