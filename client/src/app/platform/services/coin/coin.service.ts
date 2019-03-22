import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CMCRequest, CryptoCoin } from "../../models/coin/coin";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CoinService {
  constructor(private httpClient: HttpClient) {}

  getCoins(request: CMCRequest): Observable<CryptoCoin[]> {
    const queryParams = `?limit=${request.limit}&start=${
      request.start
    }&convert=${request.currency.name}`;
    return this.httpClient.get(environment.API_URL + queryParams).pipe(
      map((response: any) => {
        console.log("response", response);

        return response.data.map(
          item => new CryptoCoin({ ...item, isFavourite: false })
        );
      })
    );
  }
}
