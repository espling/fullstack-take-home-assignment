import type { Track } from "../types/track.ts";

/**
 * Fetches all tracks
 * @param signal?: AbortSignal;
 * @returns - List of tracks.
 */
export const fetchTracks = async (
  signal: AbortSignal
): Promise<Track[] | null> => {
  try {
    const response = await fetch("http://0.0.0.0:8000/tracks/", {
      mode: "cors",
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tracks: ${response.statusText}`);
    }

    return response.json() as Promise<Track[]>;
  } catch (error) {
    if (!signal.aborted) {
      console.error(`Error fetching tracks:`, error);
    }
    return null;
  }
};
