import { Favorite } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * Fetch favorites for a user and category
 */
const fetchFavorites = async ({ userId, category, limit, offset }) => {
  if (!["artist", "album", "track"].includes(category)) {
    throw ApiError.badRequest("Invalid category provided.");
  }

  const favorites = await Favorite.findAndCountAll({
    where: {
      user_id: userId,
      entity_type: category,
    },
    limit: Number(limit),
    offset: Number(offset),
    order: [["created_at", "DESC"]],
  });

  return favorites.rows;
};

/**
 * Add a favorite item
 */
const createFavorite = async ({ userId, category, item_id }) => {
  if (!["artist", "album", "track"].includes(category)) {
    throw ApiError.badRequest("Invalid category provided.");
  }

  const existingFavorite = await Favorite.findOne({
    where: {
      user_id: userId,
      entity_id: item_id,
      entity_type: category,
    },
  });

  if (existingFavorite) {
    throw ApiError.conflict("Favorite already exists.");
  }

  await Favorite.create({
    user_id: userId,
    entity_id: item_id,
    entity_type: category,
  });
};

/**
 * Remove a favorite item by ID
 */
const deleteFavoriteService = async (userId, favorite_id) => {
  const favorite = await Favorite.findOne({
    where: {
      favorite_id,
      user_id: userId,
    },
  });

  if (!favorite) {
    throw ApiError.notFound("Favorite not found.");
  }

  await favorite.destroy();
};

export { fetchFavorites, createFavorite, deleteFavoriteService };
