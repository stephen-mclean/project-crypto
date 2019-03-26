import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  private BASE_STORAGE_KEY: string = "PROJECT_CRYPTO_";

  constructor() {}

  set(key, value) {
    localStorage.setItem(
      `${this.BASE_STORAGE_KEY}${key}`,
      JSON.stringify(value)
    );
  }

  get(key) {
    return JSON.parse(localStorage.getItem(`${this.BASE_STORAGE_KEY}${key}`));
  }
}
