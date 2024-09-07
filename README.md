# Lemons Framework

## Overview

Lemons is a lightweight web framework for Deno that provides a set of tools to build web servers with ease. It offers support for various HTTP methods, custom middleware, request validation, and error handling.

## Installation

To use Lemons in your Deno project, import it as follows:
```ts
import { Lemons } from "lemons";
```
## Features

- **HTTP Methods**: Supports GET, POST, PUT, DELETE, PATCH, and ALL HTTP methods.
- **Custom Middleware**: Add middleware functions to process requests and responses.
- **Error Handling**: Configure custom error handling middleware.
- **Request Validation**: Validate query parameters using a schema.
- **Query Parameters**: Retrieve and work with query parameters.
- **Response Headers**: Set default response headers for all responses.

## API

### `constructor()`

Creates a new instance of the Lemons framework.

### `use(middleware: MiddlewareFn)`

Adds middleware to the application. Middleware functions can process requests and responses.

### `get(path: string, handler: RouteHandler)`

Registers a handler for GET requests at the specified path.

### `post(path: string, handler: RouteHandler)`

Registers a handler for POST requests at the specified path.

### `put(path: string, handler: RouteHandler)`

Registers a handler for PUT requests at the specified path.

### `delete(path: string, handler: RouteHandler)`

Registers a handler for DELETE requests at the specified path.

### `patch(path: string, handler: RouteHandler)`

Registers a handler for PATCH requests at the specified path.

### `all(path: string, handler: RouteHandler)`

Registers a handler for all HTTP methods at the specified path.

### `handleError(handler: (ctx: Context<State>, error: Error) => void)`

Sets up custom error handling middleware. The provided handler function will be called when an error occurs.

### `validate(schema: Record<string, (value: string | null) => boolean>)`

Creates middleware for validating query parameters against a schema. The schema should map parameter names to validation functions.

### `getQueryParams(ctx: Context<State>): Record<string, string | null>`

Retrieves query parameters from the request and returns them as a `Record<string, string | null>`.

### `setResponseHeaders(headers: Record<string, string>)`

Sets default response headers for all responses. The headers are applied to every response.

### `listen(port: number)`

Starts the server and listens on the specified port. Logs the server address to the console.

## Example Usage

```typescript
import { Lemons } from "lemons";

const app = new Lemons();

// Add middleware
app.use(async (ctx, next) => {
  console.log("Request received");
  await next();
});

// Define routes
app.get("/", (ctx) => {
  ctx.response.body = "Hello, world!";
});

// Error handling
app.handleError((ctx, error) => {
  ctx.response.status = 500;
  ctx.response.body = { error: error.message };
});

// Validate query parameters
app.validate({
  name: (value) => value !== null && value.trim() !== "",
});

// Start the server
app.listen(8000);
```