import { Injectable, EventEmitter } from "@angular/core";
import { Currency, EUR, USD } from "../../models/currency/currency";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  private current: Currency = EUR;
  private alternate: Currency = USD;
  private available: Currency[] = [EUR, USD];
  onChange = new EventEmitter<Currency>();

  getCurrentCurrency(): Currency {
    return this.current;
  }

  getAlternateCurrency(): Currency {
    return this.alternate;
  }

  getAvailableCurrencies(): Currency[] {
    return this.available;
  }

  toggleCurrentCurrency(): void {
    const current = { ...this.current };
    this.current = this.alternate;
    this.alternate = current;

    this.onChange.emit(this.current);
  }
}
