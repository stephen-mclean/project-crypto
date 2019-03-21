import { Component, OnInit, OnDestroy } from "@angular/core";
import { CurrencyService } from "./platform/services/currency/currency.service";
import { Currency } from "./platform/services/currency/currency";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  currentCurrency: Currency;
  currencySubscription: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currentCurrency = this.currencyService.getCurrentCurrency();

    this.currencySubscription = this.currencyService.onChange.subscribe(
      (newCurrency: Currency) => (this.currentCurrency = newCurrency)
    );
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

  coins = [
    {
      name: "Bitcoin",
      quotes: {
        USD: {
          price: 1234.56
        },
        EUR: {
          price: 1256.78
        }
      },
      isFavourite: false
    },
    {
      name: "Ripple",
      quotes: {
        USD: {
          price: 123.45
        },
        EUR: {
          price: 156.78
        }
      },
      isFavourite: true
    }
  ];

  onToggleFavourite(coin: any) {
    coin.isFavourite = !coin.isFavourite;
  }
}
