import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import {DbSeedDialogComponent } from './home/admin/db-seed-dialog.component';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CashierClosedComponent } from './home/cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened/cashier-opened.component';
import { ShoppingCartComponent } from './home/cashier-opened/shopping-cart.component';
import { CashierCloseDialogComponent } from './home/cashier-opened/cashier-close-dialog.component';
import { ShoppingCartCheckOutDialogComponent } from './home/cashier-opened/shopping-cart-check-out-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: CashierClosedComponent.URL, component: CashierClosedComponent },
      { path: CashierOpenedComponent.URL, component: CashierOpenedComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    ShoppingCartComponent,
    WelcomeComponent
  ];

  static componentFactory = [
    CancelYesDialogComponent,
    DbSeedDialogComponent,
    CashierCloseDialogComponent,
    ShoppingCartCheckOutDialogComponent
  ];
}
