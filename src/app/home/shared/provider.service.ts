import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Provider } from './provider.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ProviderService {
    static END_POINT = '/providers';

    static ACTIVES = '/actives';

    constructor(private httpService: HttpService) {
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

    readAllActives(): Observable<Provider[]> {
        return this.httpService.authToken().get(ProviderService.END_POINT + ProviderService.ACTIVES);
    }
}
