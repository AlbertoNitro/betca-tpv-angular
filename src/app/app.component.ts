import { Component } from '@angular/core';

import { TokensService } from './core/token.service';

import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private tokensService: TokensService, private router: Router) {
    this.tokensService.loggedObservable().subscribe(
      value => {
        if (value) {
          this.router.navigate([HomeComponent.URL]);
        } else {
          this.router.navigate(['']);
        }
      }
    );
  }
}
