import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ReservationCreation } from './reservation-creation.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ReservationService {
  static END_POINT = '/reservations';

  constructor(private httpService: HttpService) {
  }

  create(reservationCreation: ReservationCreation): Observable<any> {
    return this.httpService.authToken().pdf().post(ReservationService.END_POINT, reservationCreation);
  }

}
