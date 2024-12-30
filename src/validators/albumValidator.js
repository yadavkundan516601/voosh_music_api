import Joi from "joi";

export const albumValidationSchemas = {
  getAlbums: Joi.object({
    limit: Joi.number().integer().min(1).default(5),
    offset: Joi.number().integer().min(0).default(0),
    artist_id: Joi.string().uuid().optional(),
    hidden: Joi.boolean().optional(),
  }),

  addAlbum: Joi.object({
    artist_id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    hidden: Joi.boolean().required(),
  }),

  updateAlbum: Joi.object({
    name: Joi.string().optional(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .optional(),
    hidden: Joi.boolean().optional(),
  }),
};
