/**
 * @type {{ ADMIN: "admin"; EDITOR : "editor"; VIEWER : "viewer"} as const}
 */
export const UserRolesEnum = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);
