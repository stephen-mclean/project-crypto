import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavComponent } from './nav/nav.component';
import { TileComponent } from './tile/tile.component';
import { PageContainerComponent } from './page-container/page-container.component';

@NgModule({
  declarations: [NavComponent, TileComponent, PageContainerComponent],
  exports: [NavComponent, TileComponent, PageContainerComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class PlatformModule { }
