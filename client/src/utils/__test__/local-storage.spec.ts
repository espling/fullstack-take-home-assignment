import {beforeEach, describe, expect, it} from 'vitest';
import {LocalStorageMock} from '../../__test__';
import {LocalStorage} from '../local-storage';

const ls = new LocalStorageMock();

Object.defineProperty(window, `localStorage`, {
  value: ls,
});

describe(`LocalStorage`, () => {
  beforeEach(() => {
    ls.clear();
  });

  describe(`setItem`, () => {
    it(`should set an item in localStorage`, () => {
      const key = `testKey`;
      const payload = {id: 1, name: `test`};

      LocalStorage.setItem(key, payload);

      expect(ls.setItem).toHaveBeenCalledWith(key, JSON.stringify(payload));
    });
  });

  describe(`getItem`, () => {
    it(`should get an item from localStorage`, () => {
      const key = `testKey`;
      const payload = {name: `test`};
      ls.getItem.mockReturnValueOnce(JSON.stringify(payload));

      const result = LocalStorage.getItem<typeof payload>(key);

      expect(ls.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(payload);
    });

    it(`should return null if the item does not exist`, () => {
      const key = `thiskeydoesnotexist`;
      ls.getItem.mockReturnValueOnce(null);

      const result = LocalStorage.getItem(key);

      expect(ls.getItem).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });
  });

  describe(`removeItem`, () => {
    it(`should remove an item from localStorage`, () => {
      const key = `testKey`;

      LocalStorage.removeItem(key);

      expect(ls.removeItem).toHaveBeenCalledWith(key);
    });
  });
});
