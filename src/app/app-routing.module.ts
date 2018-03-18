import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import { DbSeedDialogComponent } from './home/admin/db-seed-dialog.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdvancedSearchComponent } from './home/cashier-opened/advanced-search.component';
import { BudgetsComponent } from './home/budgets/budgets.component';
import { CashierClosedComponent } from './home/cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened/cashier-opened.component';
import { EditTicketDialogComponent } from './home/tickets/edit-ticket-dialog/edit-ticket-dialog.component';
import { ProvidersComponent } from './home/providers/providers.component';
import { ProviderCreationEditDialogComponent } from './home/providers/provider-creation-edit-dialog.component';
import { ShoppingCartComponent } from './home/cashier-opened/shopping-cart.component';
import { CashierCloseDialogComponent } from './home/cashier-opened/cashier-close-dialog.component';
import { CashMovementDialogComponent } from './home/cash-movements/cash-movement-dialog.component';
import { ShoppingCartCheckOutDialogComponent } from './home/cashier-opened/shopping-cart-check-out-dialog.component';
import { ArticleQuickDialogComponent } from './home/cashier-opened/article-quick-generate-dialog.component';
import { StatisticsComponent } from './home/statistics/statistics.component';
import { StockAlertComponent } from './home/stock-alert/stock-alert.component';
import { TicketsComponent } from './home/tickets/tickets.component';
import { UserQuickCreationDialogComponent } from './home/cashier-opened/user-quick-creation-dialog.component';
import { UserQuickUpdateInvoiceDialogComponent } from './home/cashier-opened/user-quick-update-invoice-dialog.component';
import { UsersComponent } from './home/users/users.component';
import { UserCreationEditDialogComponent } from './home/users/user-creation-edit-dialog.component';
import { VouchersComponent } from './home/vouchers/vouchers.component';
import { VoucherCreationEditDialogComponent } from './home/vouchers/voucher-creation-edit-dialog.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { Statistics2Component } from './home/statistics2/statistics2.component';
import { VoucherConsumeDialogComponent } from './home/vouchers/voucher-consume-dialog.component';
import { ScheduleComponent } from './home/schedule/schedule.component';
import { CreateOfferDialogComponent } from './home/offers/create-offer-dialog.component';
import { SearchOfferDialogComponent } from './home/offers/search-offer-dialog.component';
import { ArticleCreationEditDialogComponent } from './home/articles/article-creation-edit-dialog.component';
import { OrdersComponent } from './home/orders/orders.component';
import { OffersComponent } from './home/offers/offers.component';


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
      { path: StockAlertComponent.URL, component: StockAlertComponent},
      { path: TicketsComponent.URL, component: TicketsComponent },
      { path: ArticlesComponent.URL, component: ArticlesComponent },
      { path: UsersComponent.URL, component: UsersComponent },
      { path: VouchersComponent.URL, component: VouchersComponent },
      { path: Statistics2Component.URL, component: Statistics2Component },
      { path: ScheduleComponent.URL, component: ScheduleComponent },
      { path: OrdersComponent.URL , component: OrdersComponent},
      { path: OffersComponent.URL , component: OffersComponent}
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
    UsersComponent,
    VouchersComponent,
    WelcomeComponent,
    Statistics2Component,
    ScheduleComponent,
    OrdersComponent,
    OffersComponent
  ];

  static COMPONENT_FACTORY = [
    CancelYesDialogComponent,
    CashierCloseDialogComponent,
    CashMovementDialogComponent,
    CreateOfferDialogComponent,
    SearchOfferDialogComponent,
    DbSeedDialogComponent,
    EditTicketDialogComponent,
    ProviderCreationEditDialogComponent,
    ShoppingCartCheckOutDialogComponent,
    ArticleCreationEditDialogComponent,
    ArticleQuickDialogComponent,
    UserCreationEditDialogComponent,
    UserQuickCreationDialogComponent,
    UserQuickUpdateInvoiceDialogComponent,
    VoucherCreationEditDialogComponent,
    VoucherConsumeDialogComponent
  ];
}
 