import redisClient from "../db/redisInstance.js";
import { verifyToken } from "../utilities/jwtUtils.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * Auth Middleware - Validates the token and checks if it's blacklisted
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next(ApiError.badRequest("Token missing"));
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    console.log("isBlacklisted :: ", isBlacklisted);
    if (isBlacklisted) {
      next(ApiError.unauthorized("Invalid Token"));
    }

    // Verify the token
    const user = verifyToken(token);
    req.user = user;

    next();
  } catch (error) {
    next(ApiError.unauthorized("Invalid Token"));
  }
};

export default authMiddleware;
