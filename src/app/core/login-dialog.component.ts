import { Component} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TokensService } from './token.service';

import { HomeComponent } from '../home/home.component';

@Component({
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
    mobile: number;
    password: string;

    constructor(private tokensService: TokensService) {
    }

    login() {
        this.tokensService.login(this.mobile, this.password, HomeComponent.URL);
    }
}
