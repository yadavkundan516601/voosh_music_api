import { User, Organization } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";
import { hashPassword, comparePassword } from "../utilities/bcryptUtils.js";
import { generateToken } from "../utilities/jwtUtils.js";

const userSignup = async (userData) => {
  const { email, password, role } = userData;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw ApiError.badRequest("Email already exists");

    const hashedPassword = await hashPassword(password);
    const isFirstUser = (await User.count()) === 0;
    const userRole = isFirstUser ? "admin" : role || "viewer";

    // Handle department creation and assignment
    let defaultOrg = await Organization.findOne({
      where: { name: "Default" },
    });

    if (isFirstUser && !defaultOrg) {
      defaultOrg = await Organization.create({
        name: "Default",
        is_active: true,
      });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      role: userRole,
      org_id: defaultOrg.org_id,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

const userLogin = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw ApiError.notFound("User not found");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    return generateToken(user);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

export { userSignup, userLogin };
