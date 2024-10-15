import { fetchTracks } from "./fetch-tracks";
import { Track } from "../types/track";
import { cacheData } from "../../../utils/cache-data";
import { TRACK_STORAGE_KEY } from "../store/store-tracks";

// export type GetTracks = [TrackResponse | null, boolean];

/**
 * Get all Tracks. The Tracks can be cached in local storage.
 * @returns A list of tracks.
 * params: signal?: AbortSignal;
 * @example
 * ```ts
 * ```
 */
export const getTracks = async (
  signal: AbortSignal
): Promise<Track[] | null> => {
  return await cacheData(async () => fetchTracks(signal), TRACK_STORAGE_KEY);
};
