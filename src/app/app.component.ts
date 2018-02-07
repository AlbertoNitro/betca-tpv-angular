import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TokensService } from './core/token.service';

import { DeleteDbDialogComponent } from './home/admin/delete-db-dialog.component';
import { SeedDbDialogComponent } from './home/admin/seed-db-dialog.component';
import { LoginDialogComponent } from './core/login-dialog.component';

import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private tokensService: TokensService, private router: Router, public snackBar: MatSnackBar) {
    this.tokensService.loggedObservable().subscribe(
      value => {
        if (value) {
          this.router.navigate([HomeComponent.URL]);
        } else {
          this.snackBar.open('Lost Credentials', 'Warning', {
            duration: 2000
          });
          this.router.navigate(['']);
        }
      }
    );
  }
}
