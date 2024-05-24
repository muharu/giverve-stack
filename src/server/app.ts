import { serveStatic } from "hono/bun";
import { Hono } from "hono/tiny";
import { injectHtmlWithHMR, isProduction } from "./utils";

const app = new Hono();

const apiRoutes = app.basePath("/api").get("/hello", async (ctx) => {
  return ctx.json({ message: "Hello from hono backend!" });
});

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
