import path from "path";
import fs from "fs";
import express from "express";
import { getViteConfig, info, error } from "./config";


let _State = {
  staticOptions: {},
};



async function getDistPath() {
  const config = await getViteConfig();
  return path.resolve(config.root, config.build.outDir);
}

export async function serveStatic(): Promise<express.RequestHandler> {
  const distPath = await getDistPath();

  if (!fs.existsSync(distPath)) {
    error(`${`Static files at ${distPath} not found!`}`);
    info(`Did you forget to run the "vite build" command?`);
  } else {
    info(`Serving static files from ${distPath}`);
  }
  return express.static(distPath, { index: false, ..._State.staticOptions });
}

export async function injectHTMLMiddleware(app: express.Express) {
  const distPath = await getDistPath();

  app.use(async (req, res, next) => {
    const templateFilePath = path.join(distPath, req.path, "index.html");
    if (fs.existsSync(templateFilePath)) {
      const html = fs.readFileSync(templateFilePath, "utf8");
      res.send(html);
    } else {
      next();
    }
  });
}
