import {
  Application,
  Router,
  Context,
  Middleware,
} from "https://deno.land/x/oak@v17.0.0/mod.ts";

type State = Record<string, unknown>;

type MiddlewareFn = Middleware<State>;

interface RouteHandler {
  (ctx: Context<State>): void;
}

class Lemons {
  private app: Application<State>;
  private router: Router;

  constructor() {
    this.app = new Application<State>();
    this.router = new Router();
  }

  use(middleware: MiddlewareFn) {
    this.app.use(middleware);
  }

  get(path: string, handler: RouteHandler) {
    this.router.get(path, handler);
  }

  post(path: string, handler: RouteHandler) {
    this.router.post(path, handler);
  }

  put(path: string, handler: RouteHandler) {
    this.router.put(path, handler);
  }

  delete(path: string, handler: RouteHandler) {
    this.router.delete(path, handler);
  }

  patch(path: string, handler: RouteHandler) {
    this.router.patch(path, handler);
  }

  all(path: string, handler: RouteHandler) {
    this.router.all(path, handler);
  }

  handleError(handler: (ctx: Context<State>, error: Error) => void) {
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        handler(ctx, error);
      }
    });
  }

  validate(schema: Record<string, (value: string | null) => boolean>) {
    return async (ctx: Context<State>, next: () => Promise<void>) => {
      const validationErrors: string[] = [];
      for (const [key, validateFn] of Object.entries(schema)) {
        const paramValue = ctx.request.url.searchParams.get(key);
        if (!validateFn(paramValue)) {
          validationErrors.push(`Invalid value for ${key}`);
        }
      }

      if (validationErrors.length > 0) {
        ctx.response.status = 400;
        ctx.response.body = { errors: validationErrors };
        return;
      }
      await next();
    };
  }

  getQueryParams(ctx: Context<State>): Record<string, string | null> {
    const params: Record<string, string | null> = {};
    ctx.request.url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  setResponseHeaders(headers: Record<string, string>) {
    this.app.use((ctx, next) => {
      ctx.response.headers = new Headers(headers);
      next();
    });
  }

  listen(port: number) {
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
    console.log(`Server running at http://localhost:${port}`);
    return this.app.listen({ port });
  }
}

export { Lemons };