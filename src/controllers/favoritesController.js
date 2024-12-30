import {
  fetchFavorites,
  createFavorite,
  deleteFavoriteService,
} from "../services/favoritesService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * GET /favorites/:category - Retrieve favorites for a category
 */
const getFavorites = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { limit = 5, offset = 0 } = req.query;
    const userId = req.user.user_id;

    const favorites = await fetchFavorites({ userId, category, limit, offset });

    return res
      .status(200)
      .json(
        new ApiResponse(200, favorites, "Favorites retrieved successfully.")
      );
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

/**
 * POST /favorites/add-favorite - Add a favorite item
 */
const addFavorite = async (req, res, next) => {
  try {
    const { category, item_id } = req.body;
    const userId = req.user.user_id;

    await createFavorite({ userId, category, item_id });

    res
      .status(201)
      .json(new ApiResponse(201, null, "Favorite added successfully."));
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

/**
 * DELETE /favorites/remove-favorite/:favorite_id - Remove a favorite item
 */
const removeFavorite = async (req, res, next) => {
  try {
    const { favorite_id } = req.params;
    const userId = req.user.user_id;

    await deleteFavoriteService(userId, favorite_id);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Favorite removed successfully."));
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

export { getFavorites, addFavorite, removeFavorite };
