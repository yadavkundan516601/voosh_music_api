export const ROLE_PERMISSIONS = {
  admin: {
    users: ["create", "read", "update", "delete"],
    artists: ["create", "read", "update", "delete"],
    albums: ["create", "read", "update", "delete"],
    tracks: ["create", "read", "update", "delete"],
    favorites: ["create", "read", "delete"],
  },
  editor: {
    artists: ["create", "read", "update", "delete"],
    albums: ["create", "read", "update", "delete"],
    tracks: ["create", "read", "update", "delete"],
    favorites: ["create", "read", "delete"],
  },
  viewer: {
    artists: ["read"],
    albums: ["read"],
    tracks: ["read"],
    favorites: ["read"],
  },
};
