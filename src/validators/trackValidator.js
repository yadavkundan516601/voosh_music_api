import Joi from "joi";

export const trackValidationSchemas = {
  getTracks: Joi.object({
    limit: Joi.number().integer().min(1).default(5),
    offset: Joi.number().integer().min(0).default(0),
    artist_id: Joi.string().uuid().optional(),
    album_id: Joi.string().uuid().optional(),
    hidden: Joi.boolean().optional(),
  }),

  addTrack: Joi.object({
    artist_id: Joi.string().uuid().required(),
    album_id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    duration: Joi.number().integer().min(1).required(),
    hidden: Joi.boolean().optional(),
  }),

  updateTrack: Joi.object({
    name: Joi.string().optional(),
    duration: Joi.number().integer().min(1).optional(),
    hidden: Joi.boolean().optional(),
  }),
};
