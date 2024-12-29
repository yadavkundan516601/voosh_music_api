import { Router } from "express";
import { readdirSync } from "fs";
import { basename, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import config from "../config/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Correct path resolution for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesPath = resolve(__dirname);

const excludedPaths = [
  `${config.apiPrefix}/login`,
  `${config.apiPrefix}/signup`,
];

// Async function to load routes
const loadRoutes = async () => {
  try {
    const files = readdirSync(routesPath).filter(
      (file) =>
        file.endsWith("Routes.js") &&
        file !== basename(__filename) &&
        file !== "index.js"
    );

    console.log("Found route files:", files);

    for (const file of files) {
      try {
        // Construct proper import path
        const importPath = `file://${resolve(routesPath, file)}`;
        console.log("Loading route file:", importPath);

        const { default: route } = await import(importPath);

        const routePrefix =
          file === "authRoutes.js"
            ? config.apiPrefix
            : `${config.apiPrefix}/${file
                .replace("Routes.js", "")
                .toLowerCase()}`;

        router.use(routePrefix, route);
        console.log(`Route loaded successfully: ${routePrefix}`);
      } catch (error) {
        console.error(`Error loading route file ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("Error reading routes directory:", error);
  }
};

// Initialize routes
loadRoutes().catch((error) => {
  console.error("Failed to load routes:", error);
});

// Apply the authMiddleware globally except for excluded paths
router.use((req, res, next) => {
  if (!excludedPaths.includes(req.path)) {
    return authMiddleware(req, res, next);
  }
  next();
});

export default router;
