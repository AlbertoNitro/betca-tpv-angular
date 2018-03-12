import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BudgetService } from './home/shared/budget.service';
import { HttpService } from './core/http.service';
import { TokensService } from './core/tokens.service';
import { CashierService } from './home/shared/cashier.service';
import { ProviderService } from './home/shared/provider.service';
import { ShoppingCartService } from './home/cashier-opened/shopping-cart.service';
import { ArticleService } from './home/shared/article.service';
import { TicketService } from './home/shared/ticket.service';
import { UserService } from './home/shared/user.service';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './home/articles/articles.component';
import {ArticlesFamilyComponent} from './home/articles-family/articles-family.component';
import {StatComponent} from './shared/modules/stat/stat.component';




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
    CoreModule
  ],
  declarations: [
    AppComponent,
    StatComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.COMPONENT_FACTORY,
    ArticlesComponent,
    ArticlesFamilyComponent
  ],
  entryComponents: [AppRoutingModule.COMPONENT_FACTORY],
  bootstrap: [AppComponent],
  providers: [
    AdminsService,
    ArticleService,
    BudgetService,
    CashierService,
    ProviderService,
    ShoppingCartService,
    TicketService,
    UserService
  ]
})
export class AppModule { }
