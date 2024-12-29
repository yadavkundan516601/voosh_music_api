import dotenv from "dotenv";
import Joi from "joi";

dotenv.config({
  path: ".env",
});

// Define the environment variable schema
const envVarsSchema = Joi.object({
  PORT: Joi.number().port().default(3000),
  DB_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(16).required(),
  API_PREFIX: Joi.string().default("/api/v1"),
}).unknown(true);

// Validate the environment variables
const { error, value } = envVarsSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) {
  console.error(`Configuration error: ${error.message}`);
  process.exit(1);
}

// Expose environment variables as a configuration object
const config = {
  port: value.PORT,
  databaseUrl: value.DB_URL,
  jwtSecret: value.JWT_SECRET,
  apiPrefix: value.API_PREFIX,
};

export default config;
