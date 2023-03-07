import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setSessionStorage(key: string, value: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorage(key: string): any {
    let returned = window.sessionStorage.getItem(key);
    if (returned !== null) {
      return JSON.parse(returned);
    }
    return null;
  }


  clearStorage() {
    window.sessionStorage.clear();
  }

}
