import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TokensService } from './core/token.service';

import { DeleteDbDialogComponent } from './admin/delete-db-dialog.component';
import { SeedDbDialogComponent } from './admin/seed-db-dialog.component';
import { LoginDialogComponent } from './core/login-dialog.component';

import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
}
