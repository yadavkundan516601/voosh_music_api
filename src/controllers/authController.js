import redisClient from "../db/redisInstance.js";
import { userSignup, userLogin } from "../services/authService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

const signup = async (req, res, next) => {
  try {
    await userSignup(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, null, "User created successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const token = await userLogin(req.body.email, req.body.password);
    return res
      .status(200)
      .json(new ApiResponse(200, { token }, "Login successful."));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

const logout = async (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json(new ApiError(401, "Token missing"));
    }

    // Decode the JWT token to get the expiry (exp)
    let decoded;
    try {
      decoded = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
    } catch (error) {
      return res.status(400).json(new ApiError(400, "Invalid token"));
    }

    if (!decoded.exp) {
      return res
        .status(400)
        .json(new ApiError(400, "Token does not have expiry information"));
    }

    const expiryTime = decoded.exp * 1000; // Convert to milliseconds

    // Calculate the TTL (Time-to-Live) for Redis: time until the token expires
    const ttl = Math.max(expiryTime - Date.now(), 0); // Ensure TTL is non-negative

    if (ttl === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Token has already expired"));
    }

    // Convert TTL to seconds and ensure it is an integer
    const ttlInSeconds = Math.floor(ttl / 1000);

    // Validate that TTL is within Redis' allowed range (1 to 2147483647 seconds)
    if (ttlInSeconds <= 0 || ttlInSeconds > 2147483647) {
      return res
        .status(400)
        .json(new ApiError(400, "TTL is out of range for Redis"));
    }

    // Blacklist the token in Redis (set expiration based on TTL)
    await redisClient.setEx(`blacklist:${token}`, ttlInSeconds, "true");

    // Respond with a successful logout message
    res.status(200).json(new ApiResponse(200, null, "Logout successful."));
  } catch (error) {
    next(ApiError.internal("Failed to logout"));
  }
};

export { signup, login, logout };
