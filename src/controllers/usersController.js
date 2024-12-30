import {
  fetchUsers,
  createUser,
  deleteUserService,
  updatePasswordService,
} from "../services/userServices.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * GET /users - Retrieve all users under the same Admin
 */
const getUsers = async (req, res, next) => {
  try {
    const { limit = 5, offset = 0, role } = req.query;
    const adminId = req.user.user_id; // Assuming `req.user` contains the authenticated user info
    const org_id = req.user.org_id;

    const users = await fetchUsers({ adminId, limit, offset, role, org_id });

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users retrieved successfully."));
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

const addUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    await createUser({ email, password, role, org_id: req.user.org_id });

    res
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

/**
 * DELETE /users/:user_id - Delete a user
 */
const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // Ensure the user is deleted
    await deleteUserService(user_id);

    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully."));
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

/**
 * PUT /users/update-password - Update user password
 */
const updatePassword = async (req, res, next) => {
  try {
    const { old_password, new_password } = req.body;
    const user_id = req.user.user_id; // Assuming user is authenticated

    // Update the user's password
    await updatePasswordService(user_id, old_password, new_password);

    res.status(204).send(); // No content for success
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

export { getUsers, addUser, deleteUser, updatePassword };
