import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavComponent } from "./nav/nav.component";
import { TileComponent } from "./tile/tile.component";
import { PageContainerComponent } from "./page-container/page-container.component";

import { CurrencyService } from "./services/currency/currency.service";

@NgModule({
  declarations: [NavComponent, TileComponent, PageContainerComponent],
  exports: [NavComponent, TileComponent, PageContainerComponent],
  imports: [CommonModule, FontAwesomeModule],
  providers: [CurrencyService]
})
export class PlatformModule {}
