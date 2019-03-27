import { Currency } from "../currency/currency";

export class CryptoCoin {
  id: number;
  cmc_rank: number;
  name: string;
  quote: any;
  isFavourite: boolean;

  constructor(data) {
    this.id = data.id;
    this.cmc_rank = data.cmc_rank;
    this.name = data.name;
    this.quote = data.quote;
    this.isFavourite = data.isFavourite;
  }
}

export interface CMCRequest {
  currency: Currency;
  limit: number;
  start: number;
}
