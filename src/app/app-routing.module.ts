import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import { DbSeedDialogComponent } from './home/admin/db-seed-dialog.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdvancedSearchComponent } from './home/cashier-opened/advanced-search/advanced-search.component';
import { BudgetsComponent } from './home/budgets/budgets.component';
import { CashierClosedComponent } from './home/cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened/cashier-opened.component';
import { EditTicketDialogComponent } from './home/tickets/edit-ticket-dialog.component';
import { ProvidersComponent } from './home/providers/providers.component';
import { ProviderCreationEditDialogComponent } from './home/providers/provider-creation-edit-dialog.component';
import { ShoppingCartComponent } from './home/cashier-opened/shopping-cart.component';
import { CashierCloseDialogComponent } from './home/cashier-opened/cashier-close-dialog.component';
import { CashMovementDialogComponent } from './home/cash-movements/cash-movement-dialog.component';
import { CheckOutDialogComponent } from './home/cashier-opened/check-out-dialog.component';
import { ArticleQuickCreationDialogComponent } from './home/cashier-opened/article-quick-creation-dialog.component';
import { StatisticsComponent } from './home/statistics/statistics.component';
import { StockAlertComponent } from './home/stock-alert/stock-alert.component';
import { TicketsComponent } from './home/tickets/tickets.component';
import { UsersComponent } from './home/users/users.component';
import { UserCreationEditDialogComponent } from './home/users/user-creation-edit-dialog.component';
import { VouchersComponent } from './home/vouchers/vouchers.component';
import { VoucherCreationDialogComponent } from './home/vouchers/voucher-creation-dialog.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { Statistics2Component } from './home/statistics2/statistics2.component';
import { VoucherConsumeDialogComponent } from './home/cashier-opened/voucher-consume-dialog.component';
import { ScheduleComponent } from './home/schedule/schedule.component';
import { OfferSearchDialogComponent } from './home/offers/offer-search-dialog.component';
import { OfferCreateEditDialogComponent } from './home/offers/offer-create-edit-dialog.component';
import { ArticleCreationEditDialogComponent } from './home/articles/article-creation-edit-dialog.component';
import { OrdersComponent } from './home/orders/orders.component';
import { OffersComponent } from './home/offers/offers.component';
import { RoleManagementComponent } from './home/role-management/role-management.component';
import { RoleManagementDialogComponent } from './home/role-management/role-management-dialog.component';
import { UserChangingPasswordDialogComponent } from './home/users/user-changing-password-dialog.component';
import { VoucherEditDialogComponent } from './home/vouchers/voucher-edit-dialog.component';
import { InvoicesComponent } from './home/invoices/invoices.component';
import { ViewInvoiceDialogComponent } from './home/invoices/view-invoice-dialog.component';
import { InvoiceCreationDialogComponent } from './home/invoices/invoice-creation-dialog.component';
import { UserQuickCrudComponent } from './home/shared/user-quick-crud.component';
import { UserQuickCreationEditDialogComponent } from './home/shared/user-quick-creation-edit-dialog.component';
import {ScheduleCreationEditDialogComponent} from "./home/schedule/schedule-creation-edit-dialog.component";


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: BudgetsComponent.URL, component: BudgetsComponent },
      { path: CashierClosedComponent.URL, component: CashierClosedComponent },
      { path: CashierOpenedComponent.URL, component: CashierOpenedComponent },
      { path: CashMovementDialogComponent.URL, component: CashMovementDialogComponent },
      { path: ProvidersComponent.URL, component: ProvidersComponent },
      { path: StatisticsComponent.URL, component: StatisticsComponent },
      { path: StockAlertComponent.URL, component: StockAlertComponent },
      { path: TicketsComponent.URL, component: TicketsComponent },
      { path: InvoicesComponent.URL, component: InvoicesComponent },
      { path: ArticlesComponent.URL, component: ArticlesComponent },
      { path: UsersComponent.URL, component: UsersComponent },
      { path: RoleManagementComponent.URL, component: RoleManagementComponent },
      { path: VouchersComponent.URL, component: VouchersComponent },
      { path: Statistics2Component.URL, component: Statistics2Component },
      { path: ScheduleComponent.URL, component: ScheduleComponent },
      { path: OrdersComponent.URL, component: OrdersComponent },
      { path: OffersComponent.URL, component: OffersComponent }
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
    BudgetsComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    CashMovementDialogComponent,
    HomeComponent,
    ProvidersComponent,
    ShoppingCartComponent,
    StatisticsComponent,
    StockAlertComponent,
    TicketsComponent,
    InvoicesComponent,
    UsersComponent,
    VouchersComponent,
    WelcomeComponent,
    Statistics2Component,
    ScheduleComponent,
    UserQuickCrudComponent,
    OrdersComponent,
    OffersComponent,
    RoleManagementComponent
  ];

  static COMPONENT_FACTORY = [
    CancelYesDialogComponent,
    CashierCloseDialogComponent,
    CashMovementDialogComponent,
    OfferSearchDialogComponent,
    OfferCreateEditDialogComponent,
    DbSeedDialogComponent,
    EditTicketDialogComponent,
    ProviderCreationEditDialogComponent,
    CheckOutDialogComponent,
    InvoiceCreationDialogComponent,
    ArticleCreationEditDialogComponent,
    ArticleQuickCreationDialogComponent,
    UserCreationEditDialogComponent,
    UserChangingPasswordDialogComponent,
    RoleManagementDialogComponent,
    UserQuickCreationEditDialogComponent,
    ViewInvoiceDialogComponent,
    VoucherCreationDialogComponent,
    VoucherEditDialogComponent,
    VoucherConsumeDialogComponent,
    ScheduleCreationEditDialogComponent
  ];
}
