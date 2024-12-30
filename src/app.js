import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Use the centralized route loader
app.use(routes);

// centralized error handler
app.use(errorHandler);

export default app;
