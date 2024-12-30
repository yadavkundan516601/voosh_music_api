// albumService.js
import { Album, Artist } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";

// Retrieve all albums
export const fetchAlbums = async ({
  limit = 5,
  offset = 0,
  artist_id,
  hidden,
}) => {
  const filters = {};

  try {
    if (artist_id) filters.artist_id = artist_id;
    if (hidden !== undefined) filters.hidden = hidden === "true";

    return await Album.findAll({
      where: filters,
      include: [{ model: Artist, attributes: ["name"] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

// Retrieve an album by ID
export const fetchAlbumById = async (id) => {
  try {
    const album = await Album.findByPk(id, {
      include: [{ model: Artist, attributes: ["name"] }],
    });

    if (!album) {
      throw ApiError.notFound("Album not found");
    }

    return album;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

// Add a new album
export const createAlbum = async ({ artist_id, name, year, hidden }) => {
  try {
    const artist = await Artist.findByPk(artist_id);

    if (!artist) {
      throw ApiError.notFound("Artist not found");
    }

    return await Album.create({ artist_id, name, year, hidden });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

// Update an album
export const updateAlbumById = async (id, updates) => {
  try {
    const album = await Album.findByPk(id);

    if (!album) {
      throw ApiError.notFound("Album not found");
    }

    return await album.update(updates);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

// Delete an album
export const deleteAlbumById = async (id) => {
  try {
    const album = await Album.findByPk(id);

    if (!album) {
      throw ApiError.notFound("Album not found");
    }

    await album.destroy();
    return album;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};
