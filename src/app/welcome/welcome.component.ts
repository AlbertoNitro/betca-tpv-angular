import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from '../core/login-dialog.component';
import { HomeComponent } from '../home/home.component';
import { TokensService } from '../core/token.service';
import { Router } from '@angular/router';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `welcome.component.html`
})
export class WelcomeComponent {
  static URL = 'welcome';

  constructor(public dialog: MatDialog, private tokensService: TokensService, private router: Router) {
  }

  login() {
    this.dialog.open(LoginDialogComponent).afterClosed().subscribe(

      usr => {
        if (usr) {
          this.tokensService.login(usr.mobile, usr.password).subscribe(
            () => this.router.navigate([HomeComponent.URL])
          );
        }
      }

    );
  }

}
