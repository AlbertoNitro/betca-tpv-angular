import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

import { Token } from './token.model';
import { Role } from './role.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { WelcomeComponent } from '../welcome/welcome.component';

@Injectable()
export class TokensService {
    static END_POINT = '/tokens';

    private _token: Token;

    constructor(private httpService: HttpService, private router: Router, public snackBar: MatSnackBar) { }

    login(token: Token) {
        this._token = token;
    }

    logout() {
        this._token = undefined;
        this.router.navigate(['/' + WelcomeComponent.URL]);
    }

    logged(): boolean {
        return this._token !== undefined;
    }

    get token(): string {
        return this._token.token;
    }

    isAdmin(): boolean {
        return this._token.roles.includes(Role.ADMIN);
    }

    isManager(): boolean {
        return this._token.roles.includes(Role.MANAGER);
    }

    read(mobile: number, password: string, route?: string) {
        this.httpService.header('Authorization', 'Basic ' + btoa(mobile + ':' + password)).post(TokensService.END_POINT).subscribe(
            (token: Token) => {
                this._token = token;
                if (route !== undefined) {
                    this.router.navigate(['/' + route]);
                }
            },
            error => this.snackBar.open(error.message, 'Error', {
                duration: 3000
            })
        );
    }

}
