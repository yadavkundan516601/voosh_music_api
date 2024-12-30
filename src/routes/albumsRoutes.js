// albumRoutes.js
import express from "express";
import * as albumController from "../controllers/albumController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validate.js";
import { albumValidationSchemas } from "../validators/albumValidator.js";

const router = express.Router();

// Retrieve all albums (accessible to all authenticated users)
router.get("/", rbacMiddleware("albums", "read"), albumController.getAlbums);

// Retrieve an album by ID (accessible to all authenticated users)
router.get(
  "/:id",
  rbacMiddleware("albums", "read"),
  albumController.getAlbumById
);

// Add a new album (restricted to Admins or Managers)
router.post(
  "/add-album",
  rbacMiddleware("albums", "create"),
  validate(albumValidationSchemas.addAlbum),
  albumController.addAlbum
);

// Update an album (restricted to Admins or Managers)
router.put(
  "/:id",
  rbacMiddleware("albums", "update"),
  validate(albumValidationSchemas.updateAlbum),
  albumController.updateAlbum
);

// Delete an album (restricted to Admins only)
router.delete(
  "/:id",
  rbacMiddleware("albums", "delete"),
  albumController.deleteAlbum
);

export default router;
