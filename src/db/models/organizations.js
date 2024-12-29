import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Organization = sequelize.define(
  "Organization",
  {
    org_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "organizations",
    timestamps: false,
  }
);

export default Organization;
