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

    read(id: string): Observable<Provider> {
        return this.httpService.authToken().get(ProviderService.END_POINT + '/' + id);
    }

    create(provider: Provider) {
        return this.httpService.authToken().successful().post(ProviderService.END_POINT, provider);
    }

    update(provider: Provider) {
        return this.httpService.authToken().successful().put(ProviderService.END_POINT + '/' + provider.id, provider);
    }

    readAll(): Observable<Provider[]> {
        return this.httpService.authToken().get(ProviderService.END_POINT);
    }
}
