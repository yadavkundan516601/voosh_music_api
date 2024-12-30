import Joi from "joi";

export const getFavoritesSchema = Joi.object({
  limit: Joi.number().integer().min(1).default(5),
  offset: Joi.number().integer().min(0).default(0),
});

export const addFavoriteSchema = Joi.object({
  category: Joi.string().valid("artist", "album", "track").required(),
  item_id: Joi.string().required(),
});
