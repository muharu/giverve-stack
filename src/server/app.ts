import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "hono/bun";
import { Hono } from "hono/tiny";
import { z } from "zod";
import { injectHtmlWithHMR, isProduction } from "./utils";

const schema = z.object({
  name: z.string().min(2).max(255),
});

const app = new Hono();

const apiRoutes = app.basePath("/api").get(
  "/hello",
  zValidator("query", schema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  async (ctx) => {
    const { name } = ctx.req.valid("query");
    return ctx.json({ message: `Hello, ${name} from hono backend!` });
  }
);

app
  .get(
    "*",
    serveStatic({
      root: isProduction ? "./dist/client" : "./src/client",
    })
  )
  .get("*", async (ctx) => {
    const html = await injectHtmlWithHMR();
    return ctx.html(html);
  });

type ApiRoutes = typeof apiRoutes;

export { app, type ApiRoutes };
