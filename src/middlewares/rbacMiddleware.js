import ApiError from "../utilities/ApiError.js";
import { ROLE_PERMISSIONS } from "../utilities/permissions.js";

const rbacMiddleware = (resource, action) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // Assume role is added to req.user via auth middleware
      const rolePermissions = ROLE_PERMISSIONS[userRole];

      if (!rolePermissions) {
        throw ApiError.forbidden("Role not recognized");
      }

      const allowedActions = rolePermissions[resource] || [];
      if (!allowedActions.includes(action)) {
        throw ApiError.unauthorized("Access denied: Insufficient permissions");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default rbacMiddleware;
