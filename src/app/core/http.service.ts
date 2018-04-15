import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { MatSnackBar, _MatOptgroupMixinBase } from '@angular/material';

import { Token } from './token.model';
import { Role } from './role.model';
import { Error } from './error.model';

@Injectable()
export class HttpService {

    static API_END_POINT = 'http://localhost:8080/api/v0';

    static UNAUTHORIZED = 401;

    private token: Token;

    private mobile: number;

    private params: URLSearchParams;

    private headers: Headers;

    private responseType: ResponseContentType;

    private successfulNotification = undefined;


    constructor(private http: Http, private snackBar: MatSnackBar, private router: Router) {
        this.resetOptions();
    }

    private resetOptions(): void {
        this.headers = new Headers();
        this.params = new URLSearchParams();
        this.responseType = ResponseContentType.Text;
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
        return this.authBasic(mobile, password).post(endPoint).map(
            token => {
                this.token = token;
                this.mobile = mobile;
            },
            error => this.logout()
        );
    }

    param(key: string, value: string): HttpService {
        this.params.append(key, value);
        return this;
    }

    header(key: string, value: string): HttpService {
        this.headers.append(key, value);
        return this;
    }

    authBasic(mobile: number, password: string): HttpService {
        this.headers.append('Authorization', 'Basic ' + btoa(mobile + ':' + password));
        return this;
    }

    authToken(): HttpService {
        let tokenValue = '';
        if (this.token !== undefined) {
            tokenValue = this.token.token;
        }
        this.headers.append('Authorization', 'Basic ' + btoa(tokenValue + ':' + ''));
        return this;
    }

    pdf(): HttpService {
        this.responseType = ResponseContentType.Blob;
        this.headers.append('Accept', 'application/pdf');
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

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({
            headers: this.headers,
            params: this.params,
            responseType: this.responseType
        });
        this.resetOptions();
        return options;
    }

    private extractData(response: Response): any {
        if (this.successfulNotification) {
            this.snackBar.open(this.successfulNotification, '', {
                duration: 2000
            });
            this.successfulNotification = undefined;
        }
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/pdf') !== -1) {
                const blob = new Blob([response.blob()], { type: 'application/pdf' });
                // window.open(window.URL.createObjectURL(blob)).print();
                const iFrame = document.createElement('iframe');
                iFrame.src = URL.createObjectURL(blob);
                iFrame.style.visibility = 'hidden';
                document.body.appendChild(iFrame);
                iFrame.contentWindow.focus();
                iFrame.contentWindow.print();
            } else if (contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        } else if (response.text()) {
            return response.text();
        } else {
            return response;
        }
    }


    private handleError(response: Response): any {
        let error: Error;
        if (response.status === HttpService.UNAUTHORIZED) {
            this.logout();
        }
        try {
            error = {
                httpError: response.status, exception: response.json().exception,
                message: response.json().message, path: response.json().path
            };
            this.snackBar.open(error.message, 'Error', {
                duration: 8000
            });
            return Observable.throw(error);
        } catch (e) {
            this.snackBar.open(response.toString(), 'Error', {
                duration: 8000
            });
            return Observable.throw(response);
        }
    }
}
