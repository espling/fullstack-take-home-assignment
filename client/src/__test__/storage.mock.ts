import {vi} from 'vitest';

export class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem = vi
    .fn()
    .mockImplementation((key: string) => this.store[key] || null);

  setItem = vi.fn().mockImplementation((key: string, value: string) => {
    this.store[key] = value;
  });

  removeItem = vi.fn().mockImplementation((key: string) => {
    delete this.store[key];
  });

  key = vi.fn().mockImplementation((index: number) => {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  });

  get length() {
    return Object.keys(this.store).length;
  }
}
