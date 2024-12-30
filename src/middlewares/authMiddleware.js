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

    // Print all data in Redis (keys and values)
    const keys = await redisClient.keys("*"); // Get all keys from Redis
    for (let key of keys) {
      const value = await redisClient.get(key); // Get the value for each key
      console.log(`Key: ${key}, Value: ${value}`); // Print each key and its value
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
