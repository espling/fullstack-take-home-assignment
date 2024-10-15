import store from "../../../store/store";

export type TrackStore = Omit<ReturnType<typeof trackStore.getState>, "storageKey">;
export type TrackStore2 = ReturnType<typeof trackStore.getState>;
export const TRACK_STORAGE_KEY = `__tracks__`;

export const trackStore = store({
  storageKey: TRACK_STORAGE_KEY,
});

