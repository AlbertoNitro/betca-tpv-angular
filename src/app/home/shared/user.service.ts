import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from './user.model';
import {HttpService} from '../../core/http.service';


import {TokensService} from '../../core/tokens.service';

@Injectable()
export class UserService {
  static END_POINT = '/users';

  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  read(mobile: number): Observable<User> {
    return this.httpService.authToken().get(UserService.END_POINT + '/' + mobile);
  }

  readProfile(): Observable<User> {
    return this.httpService.authToken().param('customer', 'false')
      .get(UserService.END_POINT + '/' + this.httpService.getMobile());
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

  updateProfile(user: User) {
    return this.httpService.authToken().successful().patch(
      UserService.END_POINT + '/' + this.httpService.getMobile(), user
    ).map(
      () => this.httpService.logout()
    );
  }

  readAll(): Observable<User[]> {
    return this.httpService.authToken().get(UserService.END_POINT);
  }

  find(user: User): Observable<User[]> {
    this.httpService.authToken();
    if (user.mobile) {
      this.httpService.param('mobile', '' + user.mobile);
    }
    if (user.username) {
      this.httpService.param('username', user.username);
    }
    if (user.dni) {
      this.httpService.param('dni', user.dni);
    }
    if (user.address) {
      this.httpService.param('address', user.address);
    }
    return this.httpService.get(UserService.END_POINT + UserService.SEARCH);
  }

  loggedInUsername(): Observable<User> {
    return this.httpService.authToken().get(TokensService.END_POINT + TokensService.USERNAME);
  }

}
