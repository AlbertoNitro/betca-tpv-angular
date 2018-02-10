import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { CashierService } from './cashier.service';
import { TokensService } from '../core/token.service';
import { DbSeedDialogComponent } from './admin/db-seed-dialog.component';
import { CancelYesDialogComponent } from '../core/cancel-yes-dialog.component';
import { CashierClosedComponent } from './cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './cashier-opened/cashier-opened.component';
import { AdminsService } from './admin/admins.service';
import { CashierCloseDialogComponent } from './cashier-opened/cashier-close-dialog.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent implements OnDestroy {

  static URL = 'home';

  cashierClosed: boolean;

  subscription: Subscription;

  constructor(public dialog: MatDialog, private tokensService: TokensService,
    private cashierService: CashierService, private router: Router, private adminsService: AdminsService) {
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
    const dialogRef = this.dialog.open(CancelYesDialogComponent);
    dialogRef.afterClosed().subscribe(
      yes => {
        if (yes) {
          this.adminsService.deleteDb();
        }
      });
  }

  closeCashier() {
    this.dialog.open(CashierCloseDialogComponent);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
