import { Injectable } from '@angular/core';

import { Provider } from './provider.model';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProviderService {
    static END_POINT = '/providers';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    readObservable(id: number): Observable<Provider> {
        return this.httpService.authToken().get(ProviderService.END_POINT + '/' + id);
    }

    createObservable(provider: Provider): Observable<boolean> {
        return this.httpService.authToken().post(ProviderService.END_POINT, provider).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    putObservable(provider: Provider): Observable<boolean> {
        return this.httpService.authToken().put(ProviderService.END_POINT + '/' + provider.id, provider).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    readAll(): Observable<Provider[]> {
        return this.httpService.authToken().get(ProviderService.END_POINT);
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}
