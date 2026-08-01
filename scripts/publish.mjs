import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFilesystemPublishProvider,
  loadSiteConfig,
  publishSite,
} from "open-website-builder";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteConfig = await loadSiteConfig(resolve(siteRoot, "owb.config.js"));
const publishProvider = createFilesystemPublishProvider({
  contentRoot: siteConfig.contentRoot,
  pagesRoot: siteConfig.pagesRoot,
  collectionsRoot: siteConfig.collectionsRoot,
  sharedRoot: siteConfig.sharedRoot,
  imagesRoot: siteConfig.imagesRoot,
  publicRoot: siteConfig.publicRoot,
});
const result = await publishSite({
  publishProvider,
  outputDir: siteConfig.publishedOutputDir,
  appRoot: resolve(siteRoot, "../open-website-builder"),
});

process.stdout.write(`Published ${result.pages.length} output(s)\n`);