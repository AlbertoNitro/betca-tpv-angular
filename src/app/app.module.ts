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
import { HttpService } from './core/http.service';
import { TokensService } from './core/token.service';

import { AppComponent } from './app.component';
import { CashierService } from './home/cashier.service';
import { ShoppingCartService } from './home/cashier-opened/shopping-cart.service';
import { ArticleService } from './home/shared/article.service';
import { TicketService } from './home/shared/ticket.service';

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
    AppRoutingModule.components,
    AppRoutingModule.componentFactory
  ],
  entryComponents: [AppRoutingModule.componentFactory],
  bootstrap: [AppComponent],
  providers: [
    AdminsService,
    CashierService,
    ShoppingCartService,
    ArticleService,
    TicketService
  ]
})
export class AppModule { }
