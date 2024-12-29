import { userSignup, userLogin } from "../services/authService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import ApiError from "../utilities/ApiError.js";

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

const login = async (req, res) => {
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

const logout = async (req, res) => {
  try {
    res.send("Not implemented");
    // res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {}
};

export { signup, login, logout };
