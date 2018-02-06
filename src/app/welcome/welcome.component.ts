import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../core/login-dialog.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `welcome.component.html`
})
export class WelcomeComponent {
  static URL = 'welcome';

  constructor(public dialog: MatDialog) {
  }

  login() {
    this.dialog.open(LoginDialogComponent);
  }

}
