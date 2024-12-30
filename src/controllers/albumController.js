// albumController.js
import * as albumService from "../services/albumService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

// Retrieve all albums
export const getAlbums = async (req, res, next) => {
  try {
    const albums = await albumService.fetchAlbums(req.query);
    // return ApiResponse.success(res, albums, "Albums retrieved successfully");
    return res
      .status(200)
      .json(new ApiResponse(200, albums, "Albums retrieved successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Retrieve an album by ID
export const getAlbumById = async (req, res, next) => {
  try {
    const album = await albumService.fetchAlbumById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, album, "Album retrieved successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Add a new album
export const addAlbum = async (req, res, next) => {
  try {
    const album = await albumService.createAlbum(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, album, "Album created successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Update an album
export const updateAlbum = async (req, res, next) => {
  try {
    const album = await albumService.updateAlbumById(req.params.id, req.body);
    return res
      .status(204)
      .json(new ApiResponse(204, album, "Album updated successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};

// Delete an album
export const deleteAlbum = async (req, res, next) => {
  try {
    const album = await albumService.deleteAlbumById(req.params.id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, `Album: ${album.name} deleted successfully`)
      );
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is already an ApiError, pass it to the error handler
      return next(error);
    }
    next(ApiError.internal(error.message));
  }
};
