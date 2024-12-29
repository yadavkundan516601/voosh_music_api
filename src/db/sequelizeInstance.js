import { Sequelize } from "sequelize";
import config from "../config/index.js";

// Initialize Sequelize instance
const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Export sequelize instance to be used in models
export default sequelize;
