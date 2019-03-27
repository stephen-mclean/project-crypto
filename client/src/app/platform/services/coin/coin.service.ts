import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CMCRequest, CryptoCoin } from "../../models/coin/coin";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { FavouritesService } from "../favourites/favourites.service";
import { Currency } from "../../models/currency/currency";

@Injectable({
  providedIn: "root"
})
export class CoinService {
  constructor(
    private httpClient: HttpClient,
    private favouritesService: FavouritesService
  ) {}

  getCoins(request: CMCRequest): Observable<CryptoCoin[]> {
    const queryParams = `?limit=${request.limit}&start=${
      request.start
    }&convert=${request.currency.name}`;
    return this.httpClient.get(environment.API_LISTINGS_URL + queryParams).pipe(
      map((response: any) => {
        console.log("response", response);

        return response.data.map(
          item =>
            new CryptoCoin({
              ...item,
              isFavourite: this.favouritesService.isFavourite(item.id)
            })
        );
      })
    );
  }

  getCoinsByIds(ids: number[], currency: Currency): Observable<CryptoCoin[]> {
    const queryParams = `?id=${ids.join(",")}&convert=${currency.name}`;
    return this.httpClient.get(environment.API_QUOTES_URL + queryParams).pipe(
      map((response: any) => {
        const { data } = response;
        return Object.keys(data).map(key => {
          const item = data[key];

          return new CryptoCoin({
            ...item,
            isFavourite: this.favouritesService.isFavourite(item.id)
          });
        });
      })
    );
  }
}
