import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavComponent } from "./nav/nav.component";
import { TileComponent } from "./tile/tile.component";
import { PageContainerComponent } from "./page-container/page-container.component";
import { ScrollComponent } from "./scroll/scroll.component";

import { CurrencyService } from "./services/currency/currency.service";
import { CoinService } from "./services/coin/coin.service";
import { LocalStorageService } from "./services/localstorage/local-storage.service";
import { FavouritesService } from "./services/favourites/favourites.service";

@NgModule({
  declarations: [
    NavComponent,
    TileComponent,
    PageContainerComponent,
    ScrollComponent
  ],
  exports: [
    NavComponent,
    TileComponent,
    PageContainerComponent,
    ScrollComponent
  ],
  imports: [CommonModule, HttpClientModule, FontAwesomeModule],
  providers: [
    CurrencyService,
    CoinService,
    LocalStorageService,
    FavouritesService
  ]
})
export class PlatformModule {}
