import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteDbDialogComponent } from './admin/delete-db-dialog.component';
import { SeedDbDialogComponent } from './admin/seed-db-dialog.component';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CashierClosedComponent } from './home/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  { path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: 'cashier-closed', component: CashierClosedComponent },
      { path: 'cashier-opened', component: CashierOpenedComponent },
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
    DeleteDbDialogComponent,
    HomeComponent,
    SeedDbDialogComponent,
    WelcomeComponent
  ];

  static componentFactory = [
    DeleteDbDialogComponent,
    SeedDbDialogComponent
  ];
}
