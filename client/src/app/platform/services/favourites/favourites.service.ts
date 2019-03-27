import { Injectable } from "@angular/core";
import { CryptoCoin } from "../../models/coin/coin";
import { LocalStorageService } from "../localstorage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class FavouritesService {
  private FAVOURITES_STORAGE_KEY: string = "FAVOURITES";
  private favourites: CryptoCoin[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.loadFavourites();
  }

  private loadFavourites(): void {
    const loaded =
      this.localStorageService.get(this.FAVOURITES_STORAGE_KEY) || [];
    this.favourites = loaded.map(item => new CryptoCoin(item));
  }

  private storeFavourites(): void {
    this.localStorageService.set(this.FAVOURITES_STORAGE_KEY, this.favourites);
  }

  getFavourites(): CryptoCoin[] {
    if (!this.favourites || !this.favourites.length) {
      this.loadFavourites();
    }

    return this.favourites;
  }

  isFavourite(id: number): boolean {
    return this.favourites.findIndex(c => c.id === id) > -1;
  }

  isFavouriteCoin(coin: CryptoCoin): boolean {
    return this.isFavourite(coin.id);
  }

  toggleFavourite(coin: CryptoCoin): CryptoCoin[] {
    if (this.isFavouriteCoin(coin)) {
      return this.removeFavourite(coin);
    }

    return this.addFavourite(coin);
  }

  addFavourite(coin: CryptoCoin): CryptoCoin[] {
    this.favourites.push(coin);
    this.storeFavourites();

    return this.getFavourites();
  }

  removeFavourite(coin: CryptoCoin): CryptoCoin[] {
    const idx = this.favourites.findIndex(c => c.id === coin.id);
    if (idx < 0) {
      throw new Error(`${coin.id} does not exist in favourites to be removed`);
    }

    this.favourites.splice(idx, 1);
    this.storeFavourites();

    return this.getFavourites();
  }
}
