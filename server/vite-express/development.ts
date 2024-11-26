import { createServer, mergeConfig, ViteDevServer } from "vite";
import { Config, getViteConfig, info } from "./config";
import express from "express";
import http from "http";
import fs from "fs";
import { findTemplateFilePath, isIgnoredPath } from "./utils";

export async function startViteDevServer(
  server: http.Server
): Promise<ViteDevServer> {
  const vite = await createServer(
    mergeConfig(
      {
        configFile: Config.viteConfigFile,
        clearScreen: false,
        appType: "custom",
        server: {
          // middlewareMode: "html", // Enable middleware mode
          middlewareMode: true,
          hmr: { server },
        },
      },
      Config.inlineViteConfig || {}
    )
  );
  server.on("close", async () => {
    await vite.close();
  });

  return vite;
}



export async function injectViteMiddleware(
  app: express.Express,
  vite: ViteDevServer
) {
  const config = await getViteConfig();
  // Serve static files through Vite middleware
  app.use(config.base, async (req, res, next) => {
    if (req.method !== "GET") return next();

    // Pass all non-HTML requests to Vite
    if (req.path.endsWith(".html")) {
      return next(); // Let Vite handle HTML requests (like index.html)
    }

    vite.middlewares(req, res, next); // Serve static assets with Vite dev server
  });
}

const stubMiddleware: express.RequestHandler = (req, res, next) => next();

export async function injectStaticMiddleware(
  app: express.Express,
  middleware: express.RequestHandler,
) {
  const config = await getViteConfig();

  app.use(config.base, (req, res, next) =>
    req.path.endsWith(".html") ? next() : middleware(req, res, next),
  );

  const router = (() => {
    try {
      return app.router;
    } catch (e) {
      return app._router;
    }
  })();

  const stubMiddlewareLayer = router.stack.find(
    (layer: { handle?: express.RequestHandler }) => layer.handle === stubMiddleware,
  );

  if (stubMiddlewareLayer !== undefined) {
    const serveStaticLayer = router.stack.pop();
    router.stack = router.stack.map((layer: unknown) => {
      return layer === stubMiddlewareLayer ? serveStaticLayer : layer;
    });
  }
}



export async function injectViteHTMLMiddleware(
  app: express.Express,
  server: ViteDevServer,
) {
  const config = await getViteConfig();

  app.use(config.base, async (req, res, next) => {
    if (req.method !== "GET") return next();

    if (isIgnoredPath(req.path, req)) return next();

    const templateFilePath = findTemplateFilePath(req.path, config.root);
    if (templateFilePath === undefined) return next();

    const template = fs.readFileSync(templateFilePath, "utf8");
    let html = await server.transformIndexHtml(
      templateFilePath,
      template,
      req.originalUrl,
    );

    try {
      res.send(html);
    } catch (e) {
      console.error(e);
      res.status(500);
      return next();
    }
  });
}

