import { useSyncExternalStore } from "react";
import { LocalStorage } from "../utils/local-storage";

type LocalStorageKey = {
  storageKey?: string | null;
};

/**
 * Create a store with a given initial state.
 * @param initialState - The initial state of the store.
 * Add a storageKey to the state to save the state in local storage.
 * @returns A store object.
 * * @example
 * ```ts
 * const store = store<MyGlobalStateType>({
 *  selectedTab: 0,
 *  selectedPlaylistId: null});
 * ```
 */
export default function store<T extends LocalStorageKey>(initialState: T) {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();
  const subscribe = (listener: (state: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getState: () => state,
    setState: (newState: T) => {
      state = newState;
      listeners.forEach((listener) => listener(state));
      if (state.storageKey) {
        LocalStorage.setItem(state.storageKey, state);
      }
    },
    subscribe,
    initializeStore: (initialState: T) => {
      if (initialState) {
        state = initialState;
      }
    },
    useStore: <U>(selector: (state: T) => U): U =>
      useSyncExternalStore(subscribe, () => selector(state)),
  };
}
