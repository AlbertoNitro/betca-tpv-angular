import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { $ } from 'protractor';
import { Token } from './token.model';
import { Role } from './role.model';

@Injectable()
export class HttpService {

    static API_URI = 'http://localhost:8080/api/v0';

    static UNAUTHORIZED = 401;

    private token: Token;

    private authorized: Subject<boolean> = new Subject();

    private params: URLSearchParams;

    private headers: Headers;

    constructor(private http: Http) {
        this.params = new URLSearchParams();
        this.headers = new Headers();
    }

    authorizedObservable(): Observable<boolean> {
        return this.authorized.asObservable();
    }

    isAuthorized(): boolean {
        return this.token !== undefined;
    }

    getRoles(): Array<Role> {
        if (this.token !== undefined) {
            return this.token.roles;
        } else {
            return undefined;
        }
    }

    logout() {
        this.token = undefined;
        this.authorized.next(false);
    }

    login(mobile: number, password: string, endPoint: string) {
        this.authBasic(mobile, password).post(endPoint).subscribe(
            token => {
                this.token = token;
                this.authorized.next(true);
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

    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.API_URI + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
            error => {
                return this.handleError(error);
            });
    }

    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.API_URI + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
            error => {
                return this.handleError(error);
            });
    }

    delete(endpoint: string): Observable<any> {
        return this.http.delete(HttpService.API_URI + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
            error => {
                return this.handleError(error);
            });
    }

    put(endpoint: string, body?: Object): Observable<any> {
        return this.http.put(HttpService.API_URI + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
            error => {
                return this.handleError(error);
            });
    }

    patch(endpoint: string, body?: Object): Observable<any> {
        return this.http.patch(HttpService.API_URI + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
            error => {
                return this.handleError(error);
            });
    }

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({ headers: this.headers, params: this.params });
        this.headers = new Headers();
        this.params = new URLSearchParams();
        return options;
    }

    private extractData(res: Response): any {
        if (res.text()) {
            if (res.headers.get('content-type').indexOf('application/json') !== -1) {
                return res.json(); // Para filtrar: .map((item: Item) => item.???)
            } else {
                return res.text();
            }
        } else {
            return res;
        }
    }

    private handleError(error: Response): any {
        if (error.status === HttpService.UNAUTHORIZED) {
            this.logout();
        }
        try {
            return Observable.throw(error.json());
        } catch (e) {
            return Observable.throw(error);
        }
    }
}
