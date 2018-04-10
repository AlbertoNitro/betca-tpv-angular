import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

import { Role } from './role.model';

@Injectable()
export class TokensService {
    static END_POINT = '/tokens';
    static USERNAME = '/username';

    constructor(private httpService: HttpService) {
    }

    login(mobile: number, password: string): Observable<any> {
        return this.httpService.login(mobile, password, TokensService.END_POINT);
    }

    logout(): void {
        this.httpService.logout();
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
