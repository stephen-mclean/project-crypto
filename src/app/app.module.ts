import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlatformModule } from './platform/platform.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlatformModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
