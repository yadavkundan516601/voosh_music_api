import sequelize from "./sequelizeInstance.js";

// Import all models here
import Organization from "./models/organizations.js";
import User from "./models/users.js";
// import Artist from "./models/Artist";
// import Album from "./models/Album";
// import Track from "./models/Track";
// import Favorite from "./models/Favorite";

// Define associations here
Organization.hasMany(User, { foreignKey: "org_id" });
User.belongsTo(Organization, { foreignKey: "org_id" });

// User.hasMany(Favorite, { foreignKey: "user_id" });
// Favorite.belongsTo(User, { foreignKey: "user_id" });

// Artist.hasMany(Album, { foreignKey: "artist_id" });
// Album.belongsTo(Artist, { foreignKey: "artist_id" });

// Artist.hasMany(Track, { foreignKey: "artist_id" });
// Track.belongsTo(Artist, { foreignKey: "artist_id" });

// Album.hasMany(Track, { foreignKey: "album_id" });
// Track.belongsTo(Album, { foreignKey: "album_id" });

// Export the Sequelize instance and models
// export { sequelize, Organization, User, Artist, Album, Track, Favorite };
export { sequelize, User, Organization };
