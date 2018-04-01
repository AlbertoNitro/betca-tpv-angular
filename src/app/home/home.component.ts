import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { CashierService } from './shared/cashier.service';
import { TokensService } from '../core/tokens.service';
import { DbSeedDialogComponent } from './admin/db-seed-dialog.component';
import { CancelYesDialogComponent } from '../core/cancel-yes-dialog.component';
import { CashierClosedComponent } from './cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './cashier-opened/cashier-opened/cashier-opened.component';
import { AdminsService } from './admin/admins.service';
import { BudgetsComponent } from './budgets/budgets.component';
import { CashierCloseDialogComponent } from './cashier-opened/cashier-opened/cashier-close-dialog.component';
import { CashierMovementDialogComponent } from './cashier-opened/cashier-opened/cashier-movement-dialog.component';
import { UsersComponent } from './users/users.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StockAlertComponent } from './stock-alert/stock-alert.component';
import { ProvidersComponent } from './providers/providers.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ArticlesComponent } from './articles/articles.component';
import { Statistics2Component } from './statistics2/statistics2.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { OrdersComponent } from './orders/orders.component';
import { OfferSearchDialogComponent } from './offers/offer-search-dialog.component';
import { OffersComponent } from './offers/offers.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserChangingPasswordDialogComponent } from './users/user-changing-password-dialog.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { User } from './shared/user.model';
import { UserService } from './shared/user.service';
import { CashierClosuresComponent } from './cashier-closures/cashier-closures.component';

@Component({
  styles: [`mat-toolbar {justify-content: space-between;}`],
  templateUrl: `home.component.html`
})
export class HomeComponent implements OnInit {
  static URL = 'home';

  cahierClosed: boolean;

  data: User[];

  ngOnInit(): void {
    this.synchronize();
  }

  constructor(private dialog: MatDialog, public tokensService: TokensService,
    private cashierService: CashierService, private router: Router,
    private adminsService: AdminsService, private userService: UserService) {

    this.home();
  }

  home() {
    this.cashierService.last().subscribe(
      cashierLast => {
        this.cahierClosed = cashierLast.closed;
        if (cashierLast.closed) {
          this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
        } else {
          this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
        }
      }
    );
  }

  synchronize() {
    this.userService.readAll().subscribe(
      data => this.data = data
    );
  }


  editPassword(user: User) {
    this.userService.read(user.mobile).subscribe(
      data => {
        const dialogRef = this.dialog.open(UserChangingPasswordDialogComponent);
        dialogRef.componentInstance.user = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          result => this.synchronize()
        );
      }
    );
  }


  logout() {
    this.tokensService.logout();
  }

  powerOff() {
    this.adminsService.powerOff();
    this.logout();
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

  closeCashier() {
    this.dialog.open(CashierCloseDialogComponent).afterClosed().subscribe(
      () => this.home()
    );
  }

  openCashier() {
    this.cashierService.open().subscribe(
      () => this.home()
    );
  }

  cashMovement() {
    this.dialog.open(CashierMovementDialogComponent);
  }

  cashierClosure() {
    this.router.navigate([HomeComponent.URL, CashierClosuresComponent.URL]);
  }

  customers() {
    this.router.navigate([HomeComponent.URL, UsersComponent.URL]);
  }

  vouchers() {
    this.router.navigate([HomeComponent.URL, VouchersComponent.URL]);
  }

  statistics() {
    this.router.navigate([HomeComponent.URL, StatisticsComponent.URL]);
  }

  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }

  invoices() {
    this.router.navigate([HomeComponent.URL, InvoicesComponent.URL]);
  }

  article() {
    this.router.navigate([HomeComponent.URL, ArticlesComponent.URL]);
  }

  providers() {
    this.router.navigate([HomeComponent.URL, ProvidersComponent.URL]);
  }

  statistics2() {
    this.router.navigate([HomeComponent.URL, Statistics2Component.URL]);
  }

  stockAlerts() {
    this.router.navigate([HomeComponent.URL, StockAlertComponent.URL]);
  }

  schedule() {
    this.router.navigate([HomeComponent.URL, ScheduleComponent.URL]);
  }

  searchOffer() {
    this.dialog.open(OfferSearchDialogComponent);
  }

  OffersManagment() {
    this.router.navigate([HomeComponent.URL, OffersComponent.URL]);
  }

  budgets() {
    this.router.navigate([HomeComponent.URL, BudgetsComponent.URL]);
  }

  Orders() {
    this.router.navigate([HomeComponent.URL, OrdersComponent.URL]);
  }

  password() {
    this.editPassword(this.data[1]);
  }

  roleManagement() {
    this.router.navigate([HomeComponent.URL, RoleManagementComponent.URL]);
  }

}
