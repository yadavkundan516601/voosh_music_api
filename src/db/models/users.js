import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";
import { AvailableUserRoles } from "../../config/constants.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    org_id: {
      type: DataTypes.UUID,
      references: {
        model: "organizations",
        key: "org_id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: AvailableUserRoles,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
