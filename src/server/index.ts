import { app, type ApiRoutes } from "./app";
import { isProduction } from "./utils";

const port = Bun.env.PORT ?? 4173;

if (isProduction && process.versions.bun && typeof Bun !== "undefined") {
  Bun.serve({
    port,
    fetch: app.fetch,
    hostname: "0.0.0.0",
  });

  console.log(`Server run on port ${port}`);
  console.log(`Running on ${Bun.env.NODE_ENV} mode!`);
}

export default app;
export { type ApiRoutes };
