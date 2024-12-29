import { Router } from "express";
import { signup, login, logout } from "../controllers/authController.js";
import {
  userSignupSchema,
  userLoginSchema,
} from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/signup", validate(userSignupSchema), signup);
router.post("/login", validate(userLoginSchema), login);
router.get("/logout", logout);

export default router;
