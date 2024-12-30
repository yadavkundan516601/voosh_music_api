import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Artist = sequelize.define(
  "Artist",
  {
    artist_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    grammy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
        model: "users", // Referencing the 'users' table for 'created_by'
        key: "user_id",
      },
    },
  },
  {
    tableName: "artists", // Table name for this model
    timestamps: false, // Disabling Sequelize's default timestamps, since created_at is manually defined
  }
);

export default Artist;
