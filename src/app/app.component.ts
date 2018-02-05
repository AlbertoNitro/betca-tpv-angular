import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './core/login-dialog.component';
import { TokensService } from './core/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog, private tokensService: TokensService) { }

  login() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });
  }

  logout() {
    this.tokensService.logout();
  }

}
