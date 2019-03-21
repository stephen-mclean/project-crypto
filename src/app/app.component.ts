import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-crypto';

  coins = [
    {
      name: 'Bitcoin',
      price: 1234.56,
      isFavourite: false
    },
    {
      name: 'Ripple',
      price: 123.45,
      isFavourite: true
    }
  ]

  onToggleFavourite(coin: any) {
    coin.isFavourite = !coin.isFavourite;
  }
}
