import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { CashierService } from './shared/cashier.service';
import { TokensService } from '../core/tokens.service';
import { DbSeedDialogComponent } from './admin/db-seed-dialog.component';
import { CancelYesDialogComponent } from '../core/cancel-yes-dialog.component';
import { CashierClosedComponent } from './cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './cashier-opened/cashier-opened.component';
import { AdminsService } from './admin/admins.service';
import { CashierCloseDialogComponent } from './cashier-opened/cashier-close-dialog.component';
import { UsersComponent } from './users/users.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProvidersComponent } from './providers/providers.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent implements OnDestroy {

  static URL = 'home';

  cashierClosed: boolean;

  subscription: Subscription;

  constructor(public dialog: MatDialog, public tokensService: TokensService,
    private cashierService: CashierService, private router: Router, private adminsService: AdminsService) {
    this.subscription = this.cashierService.lastObservable().subscribe(
      data => {
        this.cashierClosed = data.closed;
        this.home();
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
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.adminsService.deleteDb();
        }
      });
  }

  home() {
    if (this.cashierClosed) {
      this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
    } else {
      this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
    }
  }

  closeCashier() {
    this.dialog.open(CashierCloseDialogComponent);
  }

  customers() {
    this.router.navigate([HomeComponent.URL, UsersComponent.URL]);
  }

  vouchers(){
    this.router.navigate([HomeComponent.URL, VouchersComponent.URL]);
  }

  statistics(){
    this.router.navigate([HomeComponent.URL, StatisticsComponent.URL]);
  }

  providers() {
    this.router.navigate([HomeComponent.URL, ProvidersComponent.URL]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
