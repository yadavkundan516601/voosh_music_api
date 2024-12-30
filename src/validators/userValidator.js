import Joi from "joi";

const addUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("editor", "viewer").required(),
});

const updatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(8).required(),
});

const getUsersQuerySchema = Joi.object({
  limit: Joi.number().min(1).max(100).default(5),
  offset: Joi.number().min(0).default(0),
  role: Joi.string().valid("editor", "viewer").optional(),
});

export { addUserSchema, updatePasswordSchema, getUsersQuerySchema };
