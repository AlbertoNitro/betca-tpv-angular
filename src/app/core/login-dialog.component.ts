import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TokensService } from './token.service';

@Component({
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

    @Input() targetUrl: string;
    mobile: number;
    password: string;

    constructor(private tokensService: TokensService, private router: Router) {
    }

    login(): void {
        this.tokensService.login(this.mobile, this.password).subscribe(
            () => this.router.navigate([this.targetUrl])
        );
    }
}
