import { Lemons } from "../src/app.ts";

const app = new Lemons();

app.use(async (ctx, next) => {
  console.log(`Received ${ctx.request.method} request for ${ctx.request.url}`);
  await next();
});

app.get("/status", (ctx) => {
  ctx.response.body = { status: "OK" };
});

app.listen(5000);