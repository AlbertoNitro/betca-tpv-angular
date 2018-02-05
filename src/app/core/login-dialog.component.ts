import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Role } from './role.model';
import { Token } from './token.model';
import { TokensService } from './token.service';

import { HomeComponent } from '../home/home.component';


@Component({
    selector: 'app-dialog-login',
    templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {
    constructor(private tokensService: TokensService, private router: Router) {
    }

    mobile: number;
    password: string;

    login() {
        this.tokensService.read(this.mobile, this.password, HomeComponent.URL);
    }
}
