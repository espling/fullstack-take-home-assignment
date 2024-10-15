export type TrackResponse = {
  tracks: Track[];
  loading: boolean;
};

export type Track = {
  id: string;
  title: string;
  length: number;
  bpm: number;
  genres: string[];
  moods: string[];
  main_artists: string[];
  featured_artists: string[];
  audio: string;
  cover_art: string;
  waveform: string;
  spotify: string;
};
