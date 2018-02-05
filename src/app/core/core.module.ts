import { NgModule } from '@angular/core';
import { HttpService } from './http.service';

import { DateComponent } from './date.component';
import { LoginDialogComponent } from './login-dialog.component';
import { TokensService } from './token.service';
import { HttpModule } from '@angular/http';
import { MatDialogModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        HttpModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,

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
    providers: [HttpService, TokensService]
})
export class CoreModule { }
