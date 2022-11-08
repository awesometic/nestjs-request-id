# NestJS Request ID

A simple module to track the request flows in the application.

It adds `X-Request-Id` to the request header and provides the injectable service to see that unique ID everywhere.

Without this kind of method, for logging the request flows you should have passed the request object everywhere you want to log about.

Now, it just can be done by importing this module in the root application module, and injecting its service anywhere you want to see the unique request ID.

## How to install

Install it using `npm` by the following command.

```bash
npm install nestjs-request-id
```

## Usage

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

// To get its request ID
this.requestIdService.requestId;
```

## License

It follows the [MIT license](LICENSE).
