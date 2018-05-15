import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import {MatSnackBar} from '@angular/material';

import {Token} from './token.model';
import {Role} from './role.model';
import {Error} from './error.model';

@Injectable()
export class HttpService {

  static API_END_POINT = 'http://localhost:8080/api/v0';
  static UNAUTHORIZED = 401;

  private printDirectly: boolean;
  private token: Token;
  private mobile: number;
  private params: HttpParams;
  private headers: HttpHeaders;
  private responseType: string;
  private successfulNotification = undefined;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
  }

  getRoles(): Array<Role> {
    if (this.token !== undefined) {
      return this.token.roles;
    } else {
      return undefined;
    }
  }

  getMobile(): number {
    return this.mobile;
  }

  logout(): void {
    this.token = undefined;
    this.mobile = undefined;
    this.router.navigate(['']);
  }

  login(mobile: number, password: string, endPoint: string): Observable<any> {
    return  this.authBasic(mobile, password).post(endPoint).map(
      token => {
        this.token = token;
        this.mobile = mobile;
      },
      () => this.logout()
    );
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value);
    return this;
  }

  header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value);
    return this;
  }

  authBasic(mobile: number, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(mobile + ':' + password));
  }

  authToken(): HttpService {
    let tokenValue = '';
    if (this.token !== undefined) {
      tokenValue = this.token.token;
    }
    return this.header('Authorization', 'Basic ' + btoa(tokenValue + ':' + ''));
  }

  pdf(printDirectly?: boolean): HttpService {
    if (printDirectly === null || printDirectly === undefined) {
      this.printDirectly = true;
    } else {
      this.printDirectly = printDirectly;
    }
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf');
    return this;
  }

  successful(notification?: String): HttpService {
    if (notification) {
      this.successfulNotification = notification;
    } else {
      this.successfulNotification = 'Successful';
    }
    return this;
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
      response => this.extractData(response)).catch(
      error => {
        return this.handleError(error);
      });
  }

  post(endpoint: string, body?: Object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
      response => this.extractData(response)).catch(
      error => {
        return this.handleError(error);
      });
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
      response => this.extractData(response)).catch(
      error => {
        return this.handleError(error);
      });
  }

  put(endpoint: string, body?: Object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
      response => this.extractData(response)).catch(
      error => {
        return this.handleError(error);
      });
  }

  patch(endpoint: string, body?: Object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
      response => this.extractData(response)).catch(
      error => {
        return this.handleError(error);
      });
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        if (this.printDirectly) {
          const iFrame = document.createElement('iframe');
          iFrame.src = URL.createObjectURL(blob);
          iFrame.style.visibility = 'hidden';
          document.body.appendChild(iFrame);
          iFrame.contentWindow.focus();
          iFrame.contentWindow.print();
        } else {
          window.open(window.URL.createObjectURL(blob));
        }
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else if (response.text()) {
      return response.text();
    } else {
      return response;
    }
  }


  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.logout();
    }
    try {
      error = response.error; // with 'text': JSON.parse(response.error);
      this.snackBar.open(error.message, 'Error', {
        duration: 5000
      });
      return Observable.throw(error);
    } catch (e) {
      this.snackBar.open(response.error, 'Error', {
        duration: 5000
      });
      return Observable.throw(response.error);
    }
  }
}
