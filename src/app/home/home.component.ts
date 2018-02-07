import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { CashierService } from './cashier.service';
import { TokensService } from '../core/token.service';

import { SeedDbDialogComponent } from './admin/seed-db-dialog.component';
import { DeleteDbDialogComponent } from './admin/delete-db-dialog.component';
import { CashierClosedComponent } from './cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './cashier-opened/cashier-opened.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;

  constructor(public dialog: MatDialog, private tokensService: TokensService,
    private cashierService: CashierService, private router: Router) {
    this.cashierService.lastObservable().subscribe(
      data => {
        this.cashierClosed = data.closed;
        if (data.closed) {
          this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
        } else {
          this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
        }
      }
    );
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

  closeCashier() {
    this.cashierService.close();
  }

}
