import jwt from "jsonwebtoken";
import config from "../config/index.js";

const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, role: user.role, org_id: user.org_id },
    config.jwtSecret,
    { expiresIn: "1d" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export { generateToken, verifyToken };
