import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        throw null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('LocalStorageService', error);
      return null;
    }
  }

  public setItem<T>(key: string, value: T): T | null {
    try {
      const valueToString = JSON.stringify(value);
      localStorage.setItem(key, valueToString);
      return value;
    } catch (error) {
      console.error('LocalStorageService', error);
      return null;
    }
  }
}
