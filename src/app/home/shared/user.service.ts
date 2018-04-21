import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { HttpService } from '../../core/http.service';


import { TokensService } from '../../core/tokens.service';

@Injectable()
export class UserService {
    static END_POINT = '/users';

    static SEARCH = '/search';

    constructor(private httpService: HttpService) {
    }

    read(mobile: number): Observable<User> {
        return this.httpService.authToken().get(UserService.END_POINT + '/' + mobile);
    }

    create(user: User): Observable<boolean> {
        return this.httpService.authToken().successful().post(UserService.END_POINT, user).map(
            data => {
                return data;
            }
        );
    }

    put(user: User): Observable<boolean> {
        return this.httpService.authToken().successful().put(UserService.END_POINT + '/' + user.mobile, user).map(
            data => {
                return data;
            }
        );
    }

    readAll(): Observable<User[]> {
        return this.httpService.authToken().get(UserService.END_POINT);
    }

    find(user: User): Observable<User[]> {
        let httpservice = this.httpService.authToken();
        if (user.mobile) {
            httpservice = httpservice.param('mobile', '' + user.mobile);
        }
        if (user.username) {
            httpservice = httpservice.param('username', user.username);
        }
        if (user.dni) {
            httpservice = httpservice.param('dni', user.dni);
        }
        if (user.address) {
            httpservice = httpservice.param('address', user.address);
        }
        return httpservice.get(UserService.END_POINT + UserService.SEARCH);
    }

    loggedInUsername(): Observable<User> {
        return this.httpService.authToken().get(TokensService.END_POINT + TokensService.USERNAME);
    }

}
