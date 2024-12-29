import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import rbacMiddleware from "../middlewares/rbacMiddleware.js";

const router = Router();

router.get("/", rbacMiddleware("users", "read"), getUsers);

router.post("/add-user", async (req, res) => {
  res.send("working..");
});

export default router;
