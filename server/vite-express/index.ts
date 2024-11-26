import { Express } from "express";
import http from "http";
import { Config, setConfig } from "./config";

async function setupServer(app: Express, server: http.Server) {
    // rumtime buid import treeshake
  if (process.env.NODE_ENV === "production") {
    const { serveStatic, injectHTMLMiddleware } = await import("./production");
    await injectHTMLMiddleware(app);
    app.use(await serveStatic());
  } else {
    const { startViteDevServer, injectStaticMiddleware, injectViteHTMLMiddleware } = await import(
      "./development"
    );
    const vite = await startViteDevServer(server);
    await injectStaticMiddleware(app, vite.middlewares);
    await injectViteHTMLMiddleware(app, vite);
  }


}

export function listen(app: Express, port: number, callback?: () => void) {
  const server = app.listen(port, () =>
    setupServer(app, server).then(callback)
  );
  return server;
}

export function config(configOptions: Partial<typeof Config>) {
  setConfig(configOptions);
}

export { Verbosity } from "./config";
