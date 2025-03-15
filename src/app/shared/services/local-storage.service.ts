import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

 
  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Fehler beim Speichern im Local Storage:', error);
    }
  }


  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Fehler beim Auslesen aus dem Local Storage:', error);
      return null;
    }
  }


  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Fehler beim Entfernen aus dem Local Storage:', error);
    }
  }

  
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Fehler beim Leeren des Local Storage:', error);
    }
  }
}
