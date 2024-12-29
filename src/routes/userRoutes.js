import { Router } from "express";
// import {
//   userSignup,
//   userLogin,
//   listUsers,
// } from "../controllers/userController.js";
// import authMiddleware from "../middlewares/authMiddleware.js";
// import validate from "../middlewares/validate.js";
// import {
//   userSignupSchema,
//   userLoginSchema,
// } from "../validations/userValidation.js";

const router = Router();

// router.get("/", authMiddleware(["Admin"]), listUsers);
// router.post("/signup", validate(userSignupSchema), userSignup);
// router.post("/login", validate(userLoginSchema), userLogin);

router.get("/", async (req, res) => {
  res.send("Hello, User!");
});

export default router;
