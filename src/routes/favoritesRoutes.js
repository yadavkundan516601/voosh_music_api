import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  addFavoriteSchema,
  getFavoritesSchema,
} from "../validators/favoritesValidator.js";

const router = Router();

router.get(
  "/:category",
  rbacMiddleware("favorites", "read"),
  validate(getFavoritesSchema),
  getFavorites
);

router.post(
  "/add-favorite",
  rbacMiddleware("favorites", "create"),
  validate(addFavoriteSchema),
  addFavorite
);

router.delete(
  "/remove-favorite/:favorite_id",
  rbacMiddleware("favorites", "delete"),
  removeFavorite
);

export default router;
