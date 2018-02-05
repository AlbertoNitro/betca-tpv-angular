import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';

import { LoginDialogComponent } from './core/login-dialog.component';
import { SeedDbDialogComponent } from './admin/seed-db-dialog.component';
import { DeleteDbDialogComponent } from './admin/delete-db-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  { path: HomeComponent.URL, component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    WelcomeComponent,
    HomeComponent,
    LoginDialogComponent,
    SeedDbDialogComponent,
    DeleteDbDialogComponent
  ];

  static componentFactory = [
    LoginDialogComponent,
    SeedDbDialogComponent,
    DeleteDbDialogComponent
  ];
}
