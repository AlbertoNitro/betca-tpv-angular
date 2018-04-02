import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Scheduler } from './scheduler.model';
import { HttpService } from '../../core/http.service';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class SchedulerService {
    static END_POINT = '/schedule';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
      console.log('constructor SchedulerService');
    }

    read(id: string): Observable<Scheduler> {
      return this.httpService.authToken().get(SchedulerService.END_POINT + '/' + id);
    }

    create(scheduler: Scheduler) {
      return this.httpService.authToken().successful().post(SchedulerService.END_POINT, scheduler);
    }

    update(scheduler: Scheduler) {
      return this.httpService.authToken().successful().put(SchedulerService.END_POINT + '/' + scheduler.id, scheduler);
    }

    readAll(): Observable<Scheduler[]> {
      return this.httpService.authToken().get(SchedulerService.END_POINT);
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}
