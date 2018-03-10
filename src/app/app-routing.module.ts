import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import {DbSeedDialogComponent } from './home/admin/db-seed-dialog.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdvancedSearchComponent } from './home/cashier-opened/advanced-search.component';
import { CashierClosedComponent } from './home/cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened/cashier-opened.component';
import { ProvidersComponent } from './home/providers/providers.component';
import { ProviderCreationDialogComponent } from './home/providers/provider-creation-dialog.component';
import { ShoppingCartComponent } from './home/cashier-opened/shopping-cart.component';
import { CashierCloseDialogComponent } from './home/cashier-opened/cashier-close-dialog.component';
import { ShoppingCartCheckOutDialogComponent } from './home/cashier-opened/shopping-cart-check-out-dialog.component';
import { ShoppingCartDialogComponent } from './home/cashier-opened/shoping-cart-dialog.component';
import { StatisticsComponent } from './home/statistics/statistics.component';
import { UserQuickCreationDialogComponent } from './home/cashier-opened/user-quick-creation-dialog.component';
import { UserQuickUpdateDialogComponent } from './home/cashier-opened/user-quick-update-dialog.component';
import { UsersComponent } from './home/users/users.component';
import { UserCreationEditDialogComponent } from './home/users/user-creation-edit-dialog.component';
import { VouchersComponent } from './home/vouchers/vouchers.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: CashierClosedComponent.URL, component: CashierClosedComponent },
      { path: CashierOpenedComponent.URL, component: CashierOpenedComponent },
      { path: StatisticsComponent.URL, component: StatisticsComponent },
      { path: UsersComponent.URL, component: UsersComponent },
      { path: VouchersComponent.URL, component: VouchersComponent },
      { path: ProvidersComponent.URL, component: ProvidersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static COMPONENTS = [
    AdvancedSearchComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    UsersComponent,
    HomeComponent,
    ShoppingCartComponent,
    StatisticsComponent,
    WelcomeComponent,
    VouchersComponent,
    ProvidersComponent
  ];

  static COMPONENT_FACTORY = [
    CancelYesDialogComponent,
    CashierCloseDialogComponent,
    DbSeedDialogComponent,
    ProviderCreationDialogComponent,
    ShoppingCartCheckOutDialogComponent,
    ShoppingCartDialogComponent,
    UserCreationEditDialogComponent,
    UserQuickCreationDialogComponent,
    UserQuickUpdateDialogComponent
  ];
}
