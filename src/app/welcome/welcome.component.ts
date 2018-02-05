import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../core/login-dialog.component';

@Component({
  templateUrl: `welcome.component.html`
})
export class WelcomeComponent {
  static URL = 'welcome';

}
