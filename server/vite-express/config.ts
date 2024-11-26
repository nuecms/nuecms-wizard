import wizardConfig from "../../wizard.config";
import express from "express";

const pc = {
  dim: (str: string) => `\u001b[2m${str}\u001b[22m`,
  bold: (str: string) => `\u001b[1m${str}\u001b[22m`,
  cyan: (str: string) => `\u001b[36m${str}\u001b[39m`,
  green: (str: string) => `\u001b[32m${str}\u001b[39m`,
  red: (str: string) => `\u001b[31m${str}\u001b[39m`,
}

// merge is deep
const merge = (a: any, b: any) => {
  const o = { ...a };
  for (const key in b) {
    if (o[key] && typeof o[key] === "object") {
      o[key] = merge(o[key], b[key]);
    } else {
      o[key] = b[key];
    }
  }
  return o;
}

export enum Verbosity {
  Silent = 0,
  ErrorsOnly = 1,
  Normal = 2,
}

export const Config = {
  mode: (process.env.NODE_ENV === "production"
    ? "production"
    : "development") as "production" | "development",
  inlineViteConfig: undefined,
  viteConfigFile: undefined as string | undefined,
  ignorePaths: undefined as
    | undefined
    | RegExp
    | ((path: string, req: express.Request) => boolean),
  verbosity: Verbosity.Normal,
};

export async function getViteConfig() {
  const s =  merge({
    root: process.cwd(),
    base: "/",
    build: { outDir: "dist" },
  }, wizardConfig.vite);
  return s;
}

export type ConfigurationOptions = Partial<typeof Config>;

export function setConfig(config: ConfigurationOptions) {
  if (config.mode !== undefined) Config.mode = config.mode;
  Config.inlineViteConfig = config.inlineViteConfig;
  Config.ignorePaths = config.ignorePaths;
  Config.viteConfigFile = config.viteConfigFile;
  if (config.verbosity !== undefined) Config.verbosity = config.verbosity;
}

export function info(msg: string, minimalVerbosity = Verbosity.Normal) {
  if (Config.verbosity < minimalVerbosity) return;

  const timestamp = new Date().toLocaleString("en-US").split(",")[1].trim();
  console.log(
    `${pc.dim(timestamp)} ${pc.bold(pc.cyan("[vite-express]"))} ${pc.green(msg)}`
  );
}


export function error(msg: string) {
  info(pc.red(msg), Verbosity.ErrorsOnly);
}
