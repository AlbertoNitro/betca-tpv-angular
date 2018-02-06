import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { CashierService } from './cashier.service';
import { TokensService } from '../core/token.service';

import { SeedDbDialogComponent } from '../admin/seed-db-dialog.component';
import { DeleteDbDialogComponent } from '../admin/delete-db-dialog.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;

  constructor(public dialog: MatDialog, private tokensService: TokensService,
    private cashierService: CashierService, private router: Router) {
    this.cashierService.getCashierLast().subscribe(
      data => {
        this.cashierClosed = data.closed;
        if (data.closed) {
          this.router.navigate(['/home/cashier-closed']);
        } else {
          this.router.navigate(['/home/cashier-opened']);
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
    this.cashierService.closeCashier();
  }

}
