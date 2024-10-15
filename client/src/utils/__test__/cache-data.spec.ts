import { describe, it, expect, vi, beforeEach } from "vitest";
import { LocalStorageMock } from "../../__test__";

import { cacheData } from "../../utils/cache-data";

const ls = new LocalStorageMock();

const mocks = vi.hoisted(() => {
  return {
    LocalStorage: {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
      getAllKeys: vi.fn(() => []),
    },
  };
});

const mockFetchFn = vi.fn();

vi.mock(`../storage`, () => {
  return {
    LocalStorage: mocks.LocalStorage,
  };
});

Object.defineProperty(window, `localStorage`, {
  value: ls,
});

describe("cacheData", () => {
  const mockCacheKey = "testKey";

  beforeEach(() => {
    mocks.LocalStorage.getItem.mockClear();
    mocks.LocalStorage.setItem.mockClear();
    ls.setItem.mockClear();
    ls.getItem.mockClear();
    mockFetchFn.mockClear();
    vi.clearAllMocks();
  });
  describe(`setItem`, () => {
    it("should return cached data if available and not call fetchFn", async () => {
      const cachedData = { id: 1, name: "test" };
      ls.getItem.mockReturnValueOnce(JSON.stringify(cachedData));
      mocks.LocalStorage.getItem(mockCacheKey);
      const result = await cacheData(mockFetchFn, mockCacheKey);
      expect(ls.getItem).toHaveBeenCalledWith(mockCacheKey);
      expect(mockFetchFn).not.toHaveBeenCalled(); // fetchFn should not be called if cached data exists
      expect(result).toEqual(cachedData);
    });
  });
  it("should fetch data if no cached data is available and cache the new data", async () => {
    const fetchedData = { id: 2, name: "Fetched Data" };

    // Mock LocalStorage to return null (no cached data)
    ls.getItem.mockReturnValueOnce(null);

    mockFetchFn.mockResolvedValueOnce(fetchedData);
    const result = await cacheData(mockFetchFn, mockCacheKey);
    expect(ls.getItem).toHaveBeenCalledWith(mockCacheKey);
    expect(mockFetchFn).toHaveBeenCalled(); // fetchFn should be called if cached data is not available
    expect(ls.setItem).toHaveBeenCalledWith(
      mockCacheKey,
      JSON.stringify({ ...fetchedData })
    );
    expect(result).toEqual(fetchedData);
  });

  it("should return null and not cache anything if fetchFn returns null", async () => {
    // Mock LocalStorage to return null (no cached data)
    ls.getItem.mockReturnValueOnce(null);
    mockFetchFn.mockResolvedValueOnce(null);

    const result = await cacheData(mockFetchFn, mockCacheKey);

    expect(ls.getItem).toHaveBeenCalledWith(mockCacheKey);
    expect(mockFetchFn).toHaveBeenCalled(); 
    expect(ls.setItem).not.toHaveBeenCalledWith(
      mockCacheKey,
      expect.anything()
    );
    expect(result).toBeNull();
  });
});
