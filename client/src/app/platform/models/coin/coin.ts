import { Currency } from "../currency/currency";

export class CryptoCoin {
  name: string;
  quote: any;
  isFavourite: boolean;

  constructor(data) {
    this.name = data.name;
    this.quote = data.quote;
  }
}

export interface CMCRequest {
  currency: Currency;
  limit: number;
  start: number;
}
