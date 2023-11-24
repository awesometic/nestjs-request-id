import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_ID_HEADER } from './requestid.constants';
import { RequestIdModuleOptions } from './requestid.interface';

@Injectable()
export class RequestIdService {
  constructor(
    private readonly options: RequestIdModuleOptions,
    private readonly request: Request,
  ) {}

  get requestIdType() {
    return this.options.type;
  }

  get requestId() {
    return this.request.headers[REQUEST_ID_HEADER];
  }
}
