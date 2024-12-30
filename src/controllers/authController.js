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

import jwt from "jsonwebtoken"; // Import JWT module

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json(new ApiError(401, "Token missing"));
    }

    // Verify the token and extract the payload
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret used during token creation
    } catch (error) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid or expired token"));
    }

    // Get the expiry time directly from the decoded token payload
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds

    // Calculate the TTL for Redis (Time-To-Live)
    const ttl = Math.max(expiryTime - Date.now(), 0); // Ensure TTL is non-negative

    // If TTL is 0, the token has already expired, so we don't need to blacklist
    if (ttl === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Token has already expired"));
    }

    // Convert TTL to seconds
    const ttlInSeconds = Math.floor(ttl / 1000);

    // Blacklist the token in Redis
    await redisClient.setEx(`blacklist:${token}`, ttlInSeconds, "true");

    // Respond with a successful logout message
    res.status(200).json(new ApiResponse(200, null, "Logout successful."));
  } catch (error) {
    next(ApiError.internal("Failed to logout"));
  }
};

export { signup, login, logout };
