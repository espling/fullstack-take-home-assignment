export class LocalStorage {
    static setItem<T>(key: string, payload: T) {
      console.log("setItem", key, payload);
      localStorage.setItem(key, JSON.stringify(payload));
    }
  
    static getItem<T>(key: string): T | null {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  
    static removeItem(key: string) {
      localStorage.removeItem(key);
    }
  
    static getAllKeys() {
      return Object.keys(localStorage);
    }
  }