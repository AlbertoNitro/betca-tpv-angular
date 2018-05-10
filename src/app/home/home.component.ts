import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

import {CashierService} from './shared/cashier.service';
import {TokensService} from '../core/tokens.service';
import {UserService} from './shared/user.service';

import {DbSeedDialogComponent} from './admin/db-seed-dialog.component';
import {CancelYesDialogComponent} from '../core/cancel-yes-dialog.component';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened/cashier-opened.component';
import {AdminsService} from './admin/admins.service';
import {BudgetsComponent} from './budgets/budgets.component';
import {CashierCloseDialogComponent} from './cashier-opened/cashier-opened/cashier-close-dialog.component';
import {CashierMovementDialogComponent} from './cashier-opened/cashier-opened/cashier-movement-dialog.component';
import {UsersComponent} from './users/users.component';
import {VouchersComponent} from './vouchers/vouchers.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ProvidersComponent} from './providers/providers.component';
import {TicketsComponent} from './tickets/tickets.component';
import {ArticlesComponent} from './articles/articles.component';
import {Statistics2Component} from './statistics2/statistics2.component';
import {OrdersComponent} from './orders/orders.component';
import {UserChangingPasswordDialogComponent} from './users/user-changing-password-dialog.component';
import {InvoicesComponent} from './invoices/invoices.component';


import {CashierClosuresComponent} from './cashier-closures/cashier-closures.component';
import {ArticlesFamilyComponent} from './articles/articles-family.component';
import {TicketTrackingComponent} from './tickets/ticket-tracking.component';
import {TagsComponent} from './articles/tags.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;

  constructor(private dialog: MatDialog, public tokensService: TokensService,
              private cashierService: CashierService, private router: Router,
              private adminsService: AdminsService, private userService: UserService) {

    this.home();
    this.userService.loggedInUsername().subscribe(
      user => this.username = user.username
    );
  }

  home() {
    this.cashierService.last().subscribe(
      cashierLast => {
        this.cashierClosed = cashierLast.closed;
        if (cashierLast.closed) {
          this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
        } else {
          this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
        }
      }
    );
  }

  profile() {
    this.userService.readProfile().subscribe(
      user => {
        this.dialog.open(UserChangingPasswordDialogComponent, {
          data: {user: user}
        });
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

  resetDb() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.adminsService.resetDb();
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

  ticketTracking() {
    this.router.navigate([HomeComponent.URL, TicketTrackingComponent.URL]);
  }

  invoices() {
    this.router.navigate([HomeComponent.URL, InvoicesComponent.URL]);
  }

  article() {
    this.router.navigate([HomeComponent.URL, ArticlesComponent.URL]);
  }

  articlesFamily() {
    this.router.navigate([HomeComponent.URL, ArticlesFamilyComponent.URL]);
  }

  providers() {
    this.router.navigate([HomeComponent.URL, ProvidersComponent.URL]);
  }

  tags() {
    this.router.navigate([HomeComponent.URL, TagsComponent.URL]);
  }

  statistics2() {
    this.router.navigate([HomeComponent.URL, Statistics2Component.URL]);
  }

  budgets() {
    this.router.navigate([HomeComponent.URL, BudgetsComponent.URL]);
  }

  Orders() {
    this.router.navigate([HomeComponent.URL, OrdersComponent.URL]);
  }

}
