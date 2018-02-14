import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    static END_POINT = '/users';

    constructor(private httpService: HttpService) {
    }

    readObservable(mobile: number): Observable<User> {
        return this.httpService.authToken().get(UserService.END_POINT + '/' + mobile);
    }

    createObservable(user: User): Observable<boolean> {
        return this.httpService.authToken().post(UserService.END_POINT, user);
    }

}
