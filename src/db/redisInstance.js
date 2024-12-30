import { createClient } from "redis";
import config from "../config/index.js";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("connect", () => console.log(":: o Redis Client Connected"));
redisClient.on("error", (err) => console.error(":: o Redis Client Error", err));
await redisClient.connect();

export default redisClient;
