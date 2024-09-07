import { Lemons } from "../src/app.ts";

const app = new Lemons();

app.get("/greet", (ctx) => {
  ctx.response.body = "Welcome to Lemons!";
});

app.listen(4000);