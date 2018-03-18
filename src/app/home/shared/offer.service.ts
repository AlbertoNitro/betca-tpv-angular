import { Injectable } from '@angular/core';

import { Offer } from './offer.model';   
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class OfferService {
    static END_POINT = '/offer';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    readObservable(code : string): Observable<Offer> {
        return this.httpService.authToken().get(OfferService.END_POINT + '/' + code);
    }

    createObservable(offer: Offer): Observable<boolean> {
        return this.httpService.authToken().post(OfferService.END_POINT, offer).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    putObservable(offer: Offer): Observable<boolean> {
        return this.httpService.authToken().put(OfferService.END_POINT + '/' + offer.code, offer).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    readAll(): Observable<Offer[]> {
        return this.httpService.authToken().get(OfferService.END_POINT);
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}
