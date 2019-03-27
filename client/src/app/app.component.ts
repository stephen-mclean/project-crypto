import { Component, OnInit, OnDestroy } from "@angular/core";
import { CurrencyService } from "./platform/services/currency/currency.service";
import { Currency } from "./platform/models/currency/currency";
import { Subscription } from "rxjs";
import { CoinService } from "./platform/services/coin/coin.service";
import { CryptoCoin } from "./platform/models/coin/coin";
import { FavouritesService } from "./platform/services/favourites/favourites.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  currentCurrency: Currency;
  currencySubscription: Subscription;
  coins: CryptoCoin[] = [];
  favouritesLoadedSeparately: number[] = [];
  loadingCoinsFailed: boolean;
  DEFAULT_LOAD_COINS_START: number = 1;
  DEFAULT_LOAD_COINS_AMOUNT: number = 10;

  constructor(
    private currencyService: CurrencyService,
    private coinService: CoinService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    this.currentCurrency = this.currencyService.getCurrentCurrency();
    this.loadCoins(true);
    this.currencySubscription = this.currencyService.onChange.subscribe(
      (newCurrency: Currency) => {
        this.currentCurrency = newCurrency;
        this.loadCoins(true);
      }
    );
  }

  private getLoadCoinsStartIndex(isRefresh: boolean): number {
    return isRefresh ? this.DEFAULT_LOAD_COINS_START : this.coins.length + 1;
  }

  private getLimitCoinsToLoad(isRefresh: boolean): number {
    return isRefresh && this.coins.length
      ? this.coins.length - this.favouritesLoadedSeparately.length
      : this.DEFAULT_LOAD_COINS_AMOUNT;
  }

  /**
   * When loading the initial list of coins, or doing a refresh
   * we need to load any favourites which will NOT be included in the main request.
   *
   * Example: If we are loading the first ten coins, which have a CMC rank from 1-10
   * and we have a favourite with a rank of 300, then it will not be included in the load,
   * and therefore won't be displayed on the UI. We want to display the favourites as a priority,
   * which is where this function comes in.
   */
  loadFavouriteCoinsOutsideInitialLoad(isForRefresh: boolean) {
    const favourites = this.favouritesService.getFavourites();
    const amountOfCoinsBeingLoaded = this.getLimitCoinsToLoad(isForRefresh);

    const favouritesIDSToLoadSeparately = favourites
      .filter(favourite => favourite.cmc_rank > amountOfCoinsBeingLoaded)
      .map(coin => coin.id);

    if (favouritesIDSToLoadSeparately.length) {
      this.coinService
        .getCoinsByIds(favouritesIDSToLoadSeparately, this.currentCurrency)
        .subscribe(
          (data: CryptoCoin[]) => {
            this.coins = [...data, ...this.coins];
            this.sortCoins();
          },
          () => {
            this.favouritesLoadedSeparately = [];
          }
        );
    }

    this.favouritesLoadedSeparately = favouritesIDSToLoadSeparately;
  }

  loadCoins(refresh = false) {
    const start = this.getLoadCoinsStartIndex(refresh);
    const limit = this.getLimitCoinsToLoad(refresh);

    const request = { currency: this.currentCurrency, start, limit };
    this.coinService.getCoins(request).subscribe(
      (data: CryptoCoin[]) => {
        if (refresh) {
          this.coins = data;
          this.loadFavouriteCoinsOutsideInitialLoad(refresh);
        } else {
          const dataWithoutFavs = data.filter(
            item => !this.favouritesLoadedSeparately.includes(item.id)
          );
          this.coins = [...this.coins, ...dataWithoutFavs];
        }

        this.sortCoins();

        this.loadingCoinsFailed = false;
      },
      () => {
        this.loadingCoinsFailed = true;
      }
    );
  }

  trackCoins(index, item) {
    return item.id;
  }

  sortCoins() {
    this.coins = this.coins.sort((a, b) => {
      if (a.isFavourite && !b.isFavourite) {
        return -1;
      } else if (!a.isFavourite && b.isFavourite) {
        return 1;
      } else {
        return a.cmc_rank - b.cmc_rank;
      }
    });
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

  onToggleFavourite(coin: CryptoCoin) {
    coin.isFavourite = !coin.isFavourite;

    this.favouritesService.toggleFavourite(coin);
  }
}
