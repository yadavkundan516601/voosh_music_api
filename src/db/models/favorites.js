import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Favorite = sequelize.define(
  "Favorite",
  {
    favorite_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "users", // Referencing the 'users' table
        key: "user_id",
      },
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "favorites", // Table name for this model
    timestamps: false, // Disabling Sequelize's default timestamps, since created_at is manually defined
  }
);

export default Favorite;
