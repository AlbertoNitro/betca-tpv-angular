import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CdkTableModule} from '@angular/cdk/table';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {CoreModule} from './core/core.module';

import {AdminsService} from './home/admin/admins.service';
import {ArticlesFamilyService} from './home/shared/articles-family.service';
import {BudgetService} from './home/shared/budget.service';
import {CashierService} from './home/shared/cashier.service';
import {CashierMovementService} from './home/cashier-opened/cashier-opened/cashier-movement.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {ArticleService} from './home/shared/article.service';
import {TicketService} from './home/shared/ticket.service';
import {UserService} from './home/shared/user.service';
import {VoucherService} from './home/shared/voucher.service';
import {OrderService} from './home/orders/orders.service';
import {OfferService} from './home/shared/offer.service';
import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts';
import {InvoiceService} from './home/shared/invoice.service';
import {ProviderService} from './home/shared/provider.service';

import {ArticleTrackingService} from './home/shared/articleTracking.service';
import {TagsService} from './home/articles/tags.sevice';


@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppMaterialModule,
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
    AppRoutingModule.COMPONENT_FACTORY
  ],
  entryComponents: [AppRoutingModule.COMPONENT_FACTORY],
  bootstrap: [AppComponent],
  providers: [
    AdminsService,
    ArticleService,
    ArticlesFamilyService,
    ArticleTrackingService,
    BudgetService,
    CashierService,
    CashierMovementService,
    InvoiceService,
    OrderService,
    OfferService,
    ProviderService,
    ShoppingCartService,
    TagsService,
    TicketService,
    UserService,
    VoucherService,
  ]
})
export class AppModule {
}
