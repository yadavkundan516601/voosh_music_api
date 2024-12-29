import { User } from "../db/index.js";
import authMiddleware from "./authMiddleware.js";

const signupAuthMiddleware = async (req, res, next) => {
  try {
    const userCount = await User.count();
    if (userCount > 0) {
      // If users exist, enforce authMiddleware
      return authMiddleware(req, res, next);
    }
    // If no users exist, skip authMiddleware
    next();
  } catch (error) {
    next(error);
  }
};

export default signupAuthMiddleware;
