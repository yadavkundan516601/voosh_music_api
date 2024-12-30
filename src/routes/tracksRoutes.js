import express from "express";
import * as trackController from "../controllers/trackController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validate.js";
import { trackValidationSchemas } from "../validators/trackValidator.js";

const router = express.Router();

router.get("/", rbacMiddleware("tracks", "read"), trackController.getTracks);

router.get(
  "/:id",
  rbacMiddleware("tracks", "read"),
  trackController.getTrackById
);

router.post(
  "/add-track",
  rbacMiddleware("tracks", "create"),
  validate(trackValidationSchemas.addTrack),
  trackController.addTrack
);

router.put(
  "/:id",
  rbacMiddleware("tracks", "update"),
  validate(trackValidationSchemas.updateTrack),
  trackController.updateTrack
);

router.delete(
  "/:id",
  rbacMiddleware("tracks", "delete"),
  trackController.deleteTrack
);

export default router;
