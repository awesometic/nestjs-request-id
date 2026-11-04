# NestJS Request ID

> [!WARNING]
> **This package is deprecated and no longer maintained.** The repository is archived.
>
> - It has a known bug: under concurrent requests, a request may read **another request's ID** ([#17](https://github.com/awesometic/nestjs-request-id/issues/17)).
> - Everything it does is available natively in [`nestjs-cls`](https://github.com/Papooch/nestjs-cls), which this package was built on anyway.
>
> Please migrate using the guide below.

## Migration guide

### Option 1. `nestjs-cls` (drop-in replacement)

```bash
npm uninstall nestjs-request-id
npm install nestjs-cls
```

```typescript
import { randomUUID } from 'node:crypto';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        // Reuse the ID from the load balancer / reverse proxy if present
        idGenerator: (req) =>
          (req.headers['x-request-id'] as string) ?? randomUUID(),
        // Echo it back in the response header (same as this package did)
        setup: (cls, _req, res) => res.setHeader('X-Request-Id', cls.getId()),
      },
    }),
  ],
})
export class ApplicationModule {}
```

Then replace `RequestIdService` with `ClsService`.

```typescript
// Before
constructor(
  @Inject(REQUEST_ID_TOKEN)
  private readonly requestIdService: RequestIdService,
) {}
this.requestIdService.requestId;

// After
constructor(private readonly cls: ClsService) {}
this.cls.getId();
```

| `nestjs-request-id` | `nestjs-cls` |
| --- | --- |
| `RequestIdFormatType.UUID_V4` (default) | `idGenerator: () => randomUUID()` |
| `RequestIdFormatType.UUID_V1` | `idGenerator: () => uuid.v1()` (`uuid` package) |
| `RequestIdFormatType.RANDOM` + `length` | `idGenerator: () => nanoid(length)` (`nanoid` package) |
| `requestIdService.requestId` | `cls.getId()` |

### Option 2. `nestjs-pino` (if you only need the ID in logs)

```typescript
import { randomUUID } from 'node:crypto';
import { LoggerModule } from 'nestjs-pino';

LoggerModule.forRoot({
  pinoHttp: {
    genReqId: (req, res) => {
      const id = (req.headers['x-request-id'] as string) ?? randomUUID();
      res.setHeader('X-Request-Id', id);
      return id;
    },
  },
});
```

### Tip: let the load balancer generate the ID

If you run behind nginx, you can generate the ID there and pass it to the app,
which the `idGenerator` / `genReqId` above will pick up.

```nginx
proxy_set_header X-Request-Id $request_id;
```

AWS ALB adds the `X-Amzn-Trace-Id` header automatically, which you can read the same way.

---

## Legacy documentation (v0.2.0)

A simple module to track the request flows in the application.

It adds `X-Request-Id` to the request/response header and provides the injectable service to see that unique ID everywhere.

Without this kind of method, for logging the request flows you should have passed the request object everywhere you want to log about.

Now, it just can be done by importing this module in the root application module, and injecting its service anywhere you want to see the unique request ID.


### Requires

- Node.js 16 or above
- NestJS 9 or above

### How to install

Install it using `npm` by the following command.

```bash
npm install nestjs-request-id
```

### Usage

Import it to the root application module.

For an option, you can choose one of the followings. These options are defined as `RequestIdFormatType`, `enum` type.

- `RANDOM`: Random unique string by `nanoid` package
- `UUID_V1`: UUID v1 string by `uuid` package
- `UUID_V4`: UUID v4 string by `uuid` package

> You can omit passing the type. It uses UUID v4 method for the default unique ID format.

```typescript
@Module({
  imports: [
    RequestIdModule.register({
      type: RequestIdFormatType.RANDOM,
      length: 10, // Length affects on RANDOM format type only
    }),
  ],
  ...
})
export class ApplicationModule {}
```

Inject `RequestIdService` using `REQUEST_ID_TOKEN` token.

```typescript
@Injectable()
export class ApplicationService {
  constructor(
    @Inject(REQUEST_ID_TOKEN)
    private readonly requestIdService: RequestIdService,
  ) {}
  ...
}
```

And you can see the type and its unique ID using the following usage.

```typescript
// To get the current format type
this.requestIdService.requestIdType;

// To get the length of the request ID in RANDOM format type
this.requestIdService.requestIdLength;

// To get its request ID
this.requestIdService.requestId;
```

## License

It follows the [MIT license](LICENSE).
