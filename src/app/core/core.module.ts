import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';

import { HttpService } from './http.service';
import { TokensService } from './token.service';

import { DateComponent } from './date.component';

import { LoginDialogComponent } from './login-dialog.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
    ],
    declarations: [
        DateComponent,
        LoginDialogComponent
    ],
    exports: [
        DateComponent,
        LoginDialogComponent
    ],
    entryComponents: [
        LoginDialogComponent
    ],
    providers: [
        HttpService,
        TokensService
    ]
})
export class CoreModule { }
