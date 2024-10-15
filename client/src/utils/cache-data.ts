import { LocalStorage } from "./local-storage";

/**
 * Cache data in local storage.
 * @param fetchFn - The function to fetch data.
 * @returns - response data
 */
export const cacheData = async <T>(
  fetchFn: () => Promise<T | null>,
  cacheKey: string
): Promise<T | null> => {
  const cachedData = LocalStorage.getItem<T>(cacheKey);

  LocalStorage.setItem(cacheKey, {
    ...cachedData,
  });

  const data = await fetchFn();

  if (!data) {
    return null;
  }

  LocalStorage.setItem<T>(cacheKey, {
    ...data,
  });

  return data;
};
