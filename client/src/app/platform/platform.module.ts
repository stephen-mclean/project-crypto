import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavComponent } from "./nav/nav.component";
import { TileComponent } from "./tile/tile.component";
import { PageContainerComponent } from "./page-container/page-container.component";

import { CurrencyService } from "./services/currency/currency.service";
import { CoinService } from "./services/coin/coin.service";
import { ScrollComponent } from "./scroll/scroll.component";

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
  providers: [CurrencyService, CoinService]
})
export class PlatformModule {}
