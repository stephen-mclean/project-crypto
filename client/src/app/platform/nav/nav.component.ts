import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  faLightbulb as faSolidLightbulb,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
import { ThemeService } from "src/app/theme/theme.service";
import { CurrencyService } from "../services/currency/currency.service";
import { Currency } from "../models/currency/currency";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit, OnDestroy {
  currentCurrency: Currency;
  currencySubscription: Subscription;
  faLightbulb: IconDefinition;

  constructor(
    private themeService: ThemeService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.setLightbulb();

    // Show the next available currency on the UI, rather than the currently selected one.
    this.currentCurrency = this.currencyService.getAlternateCurrency();
    this.currencySubscription = this.currencyService.onChange.subscribe(
      () => (this.currentCurrency = this.currencyService.getAlternateCurrency())
    );
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  toggleCurrency() {
    this.currencyService.toggleCurrentCurrency();
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

    this.setLightbulb();
  }
}
