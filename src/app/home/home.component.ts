import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { CashierService } from './cashier.service';
import { TokensService } from '../core/token.service';
import { DbSeedDialogComponent } from './admin/db-seed-dialog.component';
import { DbDeleteDialogComponent } from './admin/db-delete-dialog.component';
import { CashierClosedComponent } from './cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './cashier-opened/cashier-opened.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent implements OnDestroy {

  static URL = 'home';

  cashierClosed: boolean;

  subscription: Subscription;

  constructor(public dialog: MatDialog, private tokensService: TokensService,
    private cashierService: CashierService, private router: Router) {
    this.subscription = this.cashierService.lastObservable().subscribe(
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
    this.dialog.open(DbSeedDialogComponent);
  }

  deleteDb() {
    this.dialog.open(DbDeleteDialogComponent);
  }

  closeCashier() {
    this.cashierService.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
