import { Router } from "express";
import {
  getUsers,
  addUser,
  deleteUser,
  updatePassword,
} from "../controllers/userController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  addUserSchema,
  updatePasswordSchema,
  getUsersQuerySchema,
} from "../validators/userValidator.js";

const router = Router();

router.get(
  "/",
  validate(getUsersQuerySchema, "query"),
  rbacMiddleware("users", "read"),
  getUsers
);

router.post(
  "/add-user",
  rbacMiddleware("users", "create"),
  validate(addUserSchema),
  addUser
);

router.put("/update-password", validate(updatePasswordSchema), updatePassword);

router.delete(
  "/:user_id",
  rbacMiddleware("users", "delete"), // Ensure only Admin can delete users
  deleteUser
);

export default router;
