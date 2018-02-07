import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

import { Role } from './role.model';

@Injectable()
export class TokensService {
    static END_POINT = '/tokens';

    static AUTHENTICATED = '/authenticated';

    constructor(private httpService: HttpService) {
    }

    loggedObservable(): Observable<boolean> {
        return this.httpService.authorizedObservable();
    }

    logout() {
        this.httpService.logout();
    }

    login(mobile: number, password: string) {
        this.httpService.login(mobile, password, TokensService.END_POINT);
    }

    synchronizeLogged() {
        return this.httpService.synchronizeAuthorized(TokensService.END_POINT + TokensService.AUTHENTICATED);
    }

    isAdmin(): boolean {
        if (this.httpService.getRoles() !== undefined) {
            return this.httpService.getRoles().includes(Role.ADMIN);
        } else {
            return false;
        }
    }

    isManager(): boolean {
        if (this.httpService.getRoles() !== undefined) {
            return this.httpService.getRoles().includes(Role.MANAGER);
        } else {
            return false;
        }
    }


}
