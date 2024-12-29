import { Router } from "express";
import { readdirSync } from "fs";
import { basename, resolve } from "path";
import config from "../config/index.js";

const router = Router();
const __dirname = resolve();

// Dynamically load all route files
const routesPath = `${__dirname}/src/routes`;

readdirSync(routesPath)
  .filter(
    (file) => file.endsWith("Routes.js") && file !== basename(import.meta.url)
  ) // Only load route files
  .forEach(async (file) => {
    const { default: route } = await import(`${routesPath}/${file}`); // Dynamically import route file
    const routePrefix = `${config.apiPrefix}/${file
      .replace("Routes.js", "")
      .toLowerCase()}`;
    router.use(routePrefix, route);
  });

export default router;
