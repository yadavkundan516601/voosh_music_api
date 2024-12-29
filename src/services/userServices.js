import { User } from "../db/index.js";
import ApiError from "../utilities/ApiError.js";

/**
 * Fetch users under the same Admin
 * @param {Object} params - Filtering and pagination parameters
 * @param {number} params.adminId - Admin's ID to filter users
 * @param {number} params.limit - Number of records to fetch
 * @param {number} params.offset - Number of records to skip
 * @param {string} [params.role] - Optional role filter (Editor or Viewer)
 * @returns {Promise<Array>} - List of users
 */
const fetchUsers = async ({ adminId, limit, offset, role }) => {
  try {
    const whereClause = { adminId };

    if (role) {
      whereClause.role = role; // Add role filter if provided
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      attributes: ["user_id", "email", "role", "created_at"],
      order: [["created_at", "DESC"]],
    });

    return users.rows;
  } catch (error) {
    throw ApiError.internal("Failed to fetch users");
  }
};

export { fetchUsers };
