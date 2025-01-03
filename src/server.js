import { sequelize } from "./db/index.js";
import app from "./app.js";
import config from "./config/index.js";

const PORT = config.port || 3001;

const initService = async () => {
  try {
    // sync the database
    await sequelize.sync({ force: false });
    console.log("DB Connection has been established successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initService();
