import { Component, OnInit, OnDestroy } from "@angular/core";
import { CurrencyService } from "./platform/services/currency/currency.service";
import { Currency } from "./platform/models/currency/currency";
import { Subscription } from "rxjs";
import { CoinService } from "./platform/services/coin/coin.service";
import { CryptoCoin } from "./platform/models/coin/coin";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  currentCurrency: Currency;
  currencySubscription: Subscription;
  coins: CryptoCoin[] = [];
  loadingCoinsFailed: boolean;

  constructor(
    private currencyService: CurrencyService,
    private coinService: CoinService
  ) {}

  ngOnInit() {
    this.currentCurrency = this.currencyService.getCurrentCurrency();
    this.loadCoins();
    this.currencySubscription = this.currencyService.onChange.subscribe(
      (newCurrency: Currency) => {
        this.currentCurrency = newCurrency;
        this.loadCoins();
      }
    );
  }

  loadCoins() {
    const start = this.coins.length + 1;
    const request = { currency: this.currentCurrency, start, limit: 10 };
    this.coinService.getCoins(request).subscribe(
      (data: CryptoCoin[]) => {
        this.coins = [...this.coins, ...data];
        this.loadingCoinsFailed = false;
      },
      () => {
        this.loadingCoinsFailed = true;
      }
    );
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

  onToggleFavourite(coin: any) {
    coin.isFavourite = !coin.isFavourite;
  }
}
