import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';
import { REQUEST_ID_HEADER, REQUEST_ID_TOKEN } from './requestid.constants';
import { RequestIdFormatType } from './requestid.enum';
import { RequestIdService } from './requestid.service';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(REQUEST_ID_TOKEN)
    private readonly requestIdService: RequestIdService,
  ) {}

  use(req: Request, _: Response, next: NextFunction) {
    switch (this.requestIdService.requestIdType) {
      case RequestIdFormatType.UUID_V1:
        req.headers[REQUEST_ID_HEADER] = uuid.v1();
        break;
      case RequestIdFormatType.UUID_V4:
        req.headers[REQUEST_ID_HEADER] = uuid.v4();
        break;
    }

    next();
  }
}
