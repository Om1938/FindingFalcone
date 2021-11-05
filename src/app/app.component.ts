import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ffalcon';
  showMenu = false;

  constructor(public _service: AppService) {}
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
