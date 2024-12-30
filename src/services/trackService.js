import { Track, Artist, Album } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";

/**
 * Fetch all tracks with optional filters for artist, album, hidden status, pagination.
 */
export const fetchTracks = async ({
  limit = 5,
  offset = 0,
  artist_id,
  album_id,
  hidden,
}) => {
  try {
    const whereClause = {};
    if (artist_id) whereClause.artist_id = artist_id;
    if (album_id) whereClause.album_id = album_id;
    if (hidden !== undefined) whereClause.hidden = hidden;

    const { rows: tracks } = await Track.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: Artist, attributes: ["name"] },
        { model: Album, attributes: ["name"] },
      ],
    });

    if (!tracks.length) {
      throw ApiError.notFound("No tracks found.");
    }

    return tracks.map((track) => ({
      track_id: track.track_id,
      artist_name: track.Artist.name,
      album_name: track.Album.name,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
    }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

/**
 * Fetch a single track by ID.
 */
export const fetchTrackById = async (id) => {
  try {
    const track = await Track.findByPk(id, {
      include: [
        { model: Artist, attributes: ["name"] },
        { model: Album, attributes: ["name"] },
      ],
    });

    if (!track) {
      throw ApiError.notFound("Track not found.");
    }

    return {
      track_id: track.track_id,
      artist_name: track.Artist.name,
      album_name: track.Album.name,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal(error.message);
  }
};

/**
 * Add a new track.
 */
export const createTrack = async (data) => {
  try {
    // Validate if the artist and album exist
    const artistExists = await Artist.findByPk(data.artist_id);
    const albumExists = await Album.findByPk(data.album_id);

    if (!artistExists) throw ApiError.notFound("Artist not found.");
    if (!albumExists) throw ApiError.notFound("Album not found.");

    // Create the track
    await Track.create(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw known ApiError types
    }
    throw ApiError.internal("Failed to create track.");
  }
};

/**
 * Update a track by ID.
 */
export const updateTrackById = async (id, data) => {
  try {
    const track = await Track.findByPk(id);
    if (!track) {
      throw ApiError.notFound("Track not found.");
    }

    // Update the track
    await track.update(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw known ApiError types
    }
    throw ApiError.internal("Failed to update track.");
  }
};

/**
 * Delete a track by ID.
 */
export const deleteTrackById = async (id) => {
  try {
    const track = await Track.findByPk(id);
    if (!track) {
      throw ApiError.notFound("Track not found.");
    }

    const trackName = track.name;
    await track.destroy();
    return trackName;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw known ApiError types
    }
    throw ApiError.internal("Failed to delete track.");
  }
};
