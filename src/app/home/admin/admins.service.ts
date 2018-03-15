import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/http.service';

@Injectable()
export class AdminsService {
    static END_POINT = '/admins';
    static DB = '/db';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) { }


    seedDb(ymlFileName: string): void {
        this.httpService.authToken().post(AdminsService.END_POINT + AdminsService.DB, ymlFileName).subscribe(
            () => this.successful()
        );
    }

    deleteDb(): void {
        this.httpService.authToken().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
            () => {
                this.successful();
                this.httpService.logout();
            }
        );
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}
