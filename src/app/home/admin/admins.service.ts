import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user.model';

@Injectable()
export class AdminsService {
    static END_POINT = '/admins';
    static DB = '/db';
    static STATE = '/state';
    static USERS = '/users';

    constructor(private httpService: HttpService) { }


    powerOff() {
        this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.STATE).subscribe(
            () => { }
        );
    }

    seedDb(ymlFileName: string): void {
        this.httpService.authToken().successful().post(AdminsService.END_POINT + AdminsService.DB, ymlFileName).subscribe(
            () => { }
        );
    }

    deleteDb(): void {
        this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
            () => this.httpService.logout()
        );
    }

    readProfile(): Observable<User> {
        return this.httpService.authToken().get(AdminsService.END_POINT + AdminsService.USERS + '/' + this.httpService.getMobile());
    }

    updateProfile(user: User) {
        return this.httpService.authToken().successful().put(
            AdminsService.END_POINT + AdminsService.USERS + '/' + this.httpService.getMobile(), user);
    }

}
