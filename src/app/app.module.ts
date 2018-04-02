import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AdminsService } from './home/admin/admins.service';
import { ArticlesFamilyService } from './home/shared/articles-family.service';
import { BudgetService } from './home/shared/budget.service';
import { HttpService } from './core/http.service';
import { TokensService } from './core/tokens.service';
import { CashierService } from './home/shared/cashier.service';
import { CashierMovementService } from './home/cashier-opened/cashier-opened/cashier-movement.service';
import { ShoppingCartService } from './home/cashier-opened/shopping-cart/shopping-cart.service';
import { ArticleService } from './home/shared/article.service';
import { TicketService } from './home/shared/ticket.service';
import { UserService } from './home/shared/user.service';
import { VoucherService } from './home/shared/voucher.service';
import { orderService } from '../app/home/orders/orders.service';
import { OfferService } from './home/shared/offer.service';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { ChartsModule } from 'ng2-charts';
import { ArticlesFamilyViewComponent } from './home/cashier-opened/articles-family/articles-family.component';
import { HistoricChartComponent } from './home/statistics2/historicChart.component';
import { InvoiceService } from './home/shared/invoice.service';
import { ProviderService } from './home/shared/provider.service';
import { UserQuickCrudComponent } from './home/shared/user-quick-crud.component';
import { SchedulerService } from './home/shared/scheduler.service';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    CdkTableModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    CoreModule,
    ChartsModule

  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.COMPONENT_FACTORY,
    HistoricChartComponent
  ],
  entryComponents: [AppRoutingModule.COMPONENT_FACTORY],
  bootstrap: [AppComponent],
  providers: [
    AdminsService,
    ArticleService,
    ArticlesFamilyService,
    BudgetService,
    CashierService,
    CashierMovementService,
    InvoiceService,
    orderService,
    OfferService,
    ProviderService,
    SchedulerService,
    ShoppingCartService,
    TicketService,
    UserService,
    VoucherService
  ]
})
export class AppModule {
}
