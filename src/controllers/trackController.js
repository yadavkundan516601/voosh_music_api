import * as trackService from "../services/trackService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * GET /tracks - Retrieve all tracks
 */
export const getTracks = async (req, res, next) => {
  try {
    const tracks = await trackService.fetchTracks(req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, tracks, "Tracks retrieved successfully."));
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

/**
 * GET /tracks/:id - Retrieve a track by ID
 */
export const getTrackById = async (req, res, next) => {
  try {
    const track = await trackService.fetchTrackById(req.params.id);
    if (!track) {
      return next(ApiError.notFound("Track not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, track, "Track retrieved successfully."));
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

/**
 * POST /tracks - Create a new track
 */
export const addTrack = async (req, res, next) => {
  try {
    await trackService.createTrack(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, null, "Track created successfully."));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

/**
 * PUT /tracks/:id - Update a track by ID
 */
export const updateTrack = async (req, res, next) => {
  try {
    const updatedTrack = await trackService.updateTrackById(
      req.params.id,
      req.body
    );
    if (!updatedTrack) {
      return next(ApiError.notFound("Track not found for update"));
    }
    return res.status(204).send(); // No content for success
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

/**
 * DELETE /tracks/:id - Delete a track by ID
 */
export const deleteTrack = async (req, res, next) => {
  try {
    const trackName = await trackService.deleteTrackById(req.params.id);
    if (!trackName) {
      return next(ApiError.notFound("Track not found for deletion"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, `Track: ${trackName} deleted successfully.`)
      );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};
