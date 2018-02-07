import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/http.service';
import { TokensService } from '../../core/token.service';

import { WelcomeComponent } from '../../welcome/welcome.component';


@Injectable()
export class AdminsService {
    static END_POINT = '/admins';
    static DB = '/db';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) { }


    seedDb(ymlFileName: string) {
        this.httpService.authToken().post(AdminsService.END_POINT + AdminsService.DB, ymlFileName).subscribe(
            () => this.snackBar.open('Successful', '', {
                duration: 2000
            }),
            error => this.snackBar.open(error.message, 'Error', {
                duration: 8000
            })
        );
    }

    deleteDb() {
        this.httpService.authToken().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
            () => this.snackBar.open('Successful', '', {
                duration: 2000
            }),
            error => this.snackBar.open(error.message, 'Error', {
                duration: 10000
            })
        );
    }

}
