import { fetchUsers } from "../services/userServices.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import ApiError from "../utilities/ApiError.js";

/**
 * GET /users - Retrieve all users under the same Admin
 */
const getUsers = async (req, res, next) => {
  try {
    const { limit = 5, offset = 0, role } = req.query;
    const adminId = req.user.user_id; // Assuming `req.user` contains the authenticated user info

    const users = await fetchUsers({ adminId, limit, offset, role });

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users retrieved successfully."));
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

export { getUsers };
