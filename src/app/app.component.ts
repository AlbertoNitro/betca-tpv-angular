import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TokensService } from './core/token.service';

import { LoginDialogComponent } from './core/login-dialog.component';
import { HomeComponent } from './home/home.component';
import { SeedDbDialogComponent } from './admin/seed-db-dialog.component';
import { DeleteDbDialogComponent } from './admin/delete-db-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog, private tokensService: TokensService) { }

  login() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.tokensService.logout();
  }

  seedDb() {
    this.dialog.open(SeedDbDialogComponent);
  }

  deleteDb() {
    this.dialog.open(DeleteDbDialogComponent);
  }

}
