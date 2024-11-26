import fs from "fs";
import path from "path";
import express from "express";
import { Config } from "./config";

export function findTemplateFilePath(
  reqPath: string,
  root: string,
): string | undefined {
  if (reqPath.endsWith(".html")) {
    const pathToTest = path.join(root, reqPath);
    if (fs.existsSync(pathToTest)) return pathToTest;
  }

  // find closest index.html to provided path
  const basePath = reqPath.slice(0, reqPath.lastIndexOf("/"));
  const dirs = basePath.split("/");

  while (dirs.length > 0) {
    const pathToTest = path.join(root, ...dirs, "index.html");
    if (fs.existsSync(pathToTest)) return pathToTest;
    dirs.pop();
  }

  return undefined;
}

export function isIgnoredPath(path: string, req: express.Request) {
  if (Config.ignorePaths === undefined) return false;

  return Config.ignorePaths instanceof RegExp
    ? path.match(Config.ignorePaths)
    : Config.ignorePaths(path, req);
}
