import { Router } from "express";
import {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artistController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  addArtistSchema,
  updateArtistSchema,
} from "../validators/artistValidator.js";

const router = Router();

router.get("/", rbacMiddleware("artists", "read"), getArtists);

router.get("/:id", rbacMiddleware("artists", "read"), getArtistById);

router.post(
  "/add-artist",
  rbacMiddleware("artists", "create"),
  validate(addArtistSchema),
  addArtist
);

router.put(
  "/:id",
  rbacMiddleware("artists", "update"),
  validate(updateArtistSchema),
  updateArtist
);

router.delete("/:id", rbacMiddleware("artists", "delete"), deleteArtist);

export default router;
