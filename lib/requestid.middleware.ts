import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';
import { nanoid } from 'nanoid/async';
import { REQUEST_ID_HEADER, REQUEST_ID_TOKEN } from './requestid.constants';
import { RequestIdFormatType } from './requestid.enum';
import { RequestIdService } from './requestid.service';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(REQUEST_ID_TOKEN)
    private readonly requestIdService: RequestIdService,
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const givenLength = this.requestIdService.requestIdLength;

    switch (this.requestIdService.requestIdType) {
      case RequestIdFormatType.RANDOM:
        req.headers[REQUEST_ID_HEADER] = await nanoid(givenLength);
        break;
      case RequestIdFormatType.UUID_V1:
        req.headers[REQUEST_ID_HEADER] = uuid.v1();
        break;
      case RequestIdFormatType.UUID_V4:
        req.headers[REQUEST_ID_HEADER] = uuid.v4();
        break;
      default:
        // Throw an error if the given format type is not supported
        throw new Error(
          `Unsupported request ID format type: ${this.requestIdService.requestIdType}`,
        );
    }

    next();
  }
}
