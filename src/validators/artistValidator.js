import Joi from "joi";

export const addArtistSchema = Joi.object({
  name: Joi.string().required(),
  grammy: Joi.boolean().default(false),
  hidden: Joi.boolean().default(false),
});

export const updateArtistSchema = Joi.object({
  name: Joi.string().optional(),
  grammy: Joi.boolean().optional(),
  hidden: Joi.boolean().optional(),
}).min(1);
