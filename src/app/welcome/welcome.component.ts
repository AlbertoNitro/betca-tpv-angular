import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { TokensService } from '../core/tokens.service';
import { LoginDialogComponent } from '../core/login-dialog.component';
import { HomeComponent } from '../home/home.component';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {
  static URL = 'welcome';
  codeValue = '';

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
