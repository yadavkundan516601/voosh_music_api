import * as artistService from "../services/artistService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

// Get all artists
export const getArtists = async (req, res, next) => {
  try {
    const artists = await artistService.fetchArtists(req.query);

    res
      .status(200)
      .json(new ApiResponse(200, artists, "Artists retrieved successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Get artist by ID
export const getArtistById = async (req, res, next) => {
  try {
    const artist = await artistService.fetchArtistById(req.params.id);

    res
      .status(200)
      .json(new ApiResponse(200, artist, "Artist retrieved successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Add a new artist
export const addArtist = async (req, res, next) => {
  try {
    await artistService.createArtist({
      ...req.body,
      created_by: req.user.user_id,
      org_id: req.user.org_id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, null, "Artist created successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Update an artist
export const updateArtist = async (req, res, next) => {
  try {
    await artistService.updateArtistById(req.params.id, req.body);

    res.status(204).send();
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Delete an artist
export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await artistService.deleteArtistById(req.params.id);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { artist_id: artist.artist_id },
          `Artist: ${artist.name} deleted successfully.`
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};
