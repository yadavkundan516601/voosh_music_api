import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Album = sequelize.define(
  "Album",
  {
    album_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    artist_id: {
      type: DataTypes.UUID,
      references: {
        model: "artists", // Referencing the 'artists' table
        key: "artist_id",
      },
    },
    org_id: {
      type: DataTypes.UUID,
      references: {
        model: "organizations", // Referencing the 'organizations' table
        key: "org_id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: "users", // Referencing the 'users' table
        key: "user_id",
      },
    },
  },
  {
    tableName: "albums", // Table name for this model
    timestamps: false, // Disabling Sequelize's default timestamps, since created_at is manually defined
  }
);

export default Album;
