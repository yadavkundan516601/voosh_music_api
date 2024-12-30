import { Op } from "sequelize";
import { User } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";
import { hashPassword, comparePassword } from "../utilities/bcryptUtils.js";

const fetchUsers = async ({ adminId, limit, offset, role, org_id }) => {
  try {
    const whereClause = {
      org_id,
      user_id: {
        [Op.ne]: adminId,
      },
    };

    if (role) {
      whereClause.role = role;
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

const createUser = async ({ email, password, role, org_id }) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw ApiError.conflict("Email already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    await User.create({
      email,
      password: hashedPassword,
      role,
      org_id,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

/**
 * Delete a user by ID
 */
const deleteUserService = async (user_id) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    await user.destroy();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

/**
 * Update the user's password
 */
const updatePasswordService = async (user_id, old_password, new_password) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    // Verify the old password
    const isMatch = await comparePassword(old_password, user.password);
    if (!isMatch) {
      throw ApiError.badRequest("Old password is incorrect");
    }

    // Hash and update the new password
    const hashedPassword = await hashPassword(new_password);
    user.password = hashedPassword;
    await user.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

export { fetchUsers, createUser, deleteUserService, updatePasswordService };
