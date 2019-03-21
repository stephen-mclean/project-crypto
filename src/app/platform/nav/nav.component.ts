import { Component, OnInit } from '@angular/core';
import { faDollarSign, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faDollarSign = faDollarSign;
  faLightbulb = faLightbulb;

  constructor() { }

  ngOnInit() {
  }

  toggleCurrency() {
    console.log('toggle currency');
  }

  toggleTheme() {
    console.log('toggle theme');
  }

}
