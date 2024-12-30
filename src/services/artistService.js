import { Artist } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";

// Retrieve all artists
export const fetchArtists = async ({
  limit = 5,
  offset = 0,
  grammy,
  hidden,
}) => {
  const filters = {};

  if (grammy !== undefined) filters.grammy = grammy === "true";
  if (hidden !== undefined) filters.hidden = hidden === "true";

  return await Artist.findAll({
    where: filters,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
};

// Retrieve an artist by ID
export const fetchArtistById = async (id) => {
  const artist = await Artist.findByPk(id);

  if (!artist) {
    throw ApiError.notFound("Artist not found");
  }

  return artist;
};

// Add a new artist
export const createArtist = async ({
  name,
  grammy,
  hidden,
  created_by,
  org_id,
}) => {
  return await Artist.create({
    name,
    grammy,
    hidden,
    created_by,
    org_id,
  });
};

// Update an artist
export const updateArtistById = async (id, updates) => {
  const artist = await Artist.findByPk(id);

  if (!artist) {
    throw ApiError.notFound("Artist not found");
  }

  return await artist.update(updates);
};

// Delete an artist
export const deleteArtistById = async (id) => {
  const artist = await Artist.findByPk(id);

  if (!artist) {
    throw ApiError.notFound("Artist not found");
  }

  await artist.destroy();
  return artist;
};
