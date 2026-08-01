import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFilesystemBackendProviders,
  createOwbBackendPlugin,
  createOwbImagePlugin,
} from "open-website-builder";

const siteRoot = dirname(fileURLToPath(import.meta.url));

export const owbConfig = {
  contentRoot: siteRoot,
  pagesRoot: resolve(siteRoot, "data/pages"),
  collectionsRoot: resolve(siteRoot, "data/collections"),
  sharedRoot: resolve(siteRoot, "data/shared"),
  imagesRoot: resolve(siteRoot, "images"),
  publicRoot: resolve(siteRoot, "public"),
  publishedOutputDir: resolve(siteRoot, "dist-publish"),
  imageBaseUrl: "http://localhost:3005/images/",
};

export function plugins({ appRoot, r2, siteConfig }) {
  const backendProviders = createFilesystemBackendProviders({
    appRoot,
    siteConfig,
    r2,
  });

  return [
    createOwbBackendPlugin({ appRoot, siteConfig, backendProviders }),
    createOwbImagePlugin({ imageBaseUrl: siteConfig.imageBaseUrl }),
  ];
}
