import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { PlatformModule } from "./platform/platform.module";
import { ThemeModule } from "./theme/theme.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PlatformModule, ThemeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
