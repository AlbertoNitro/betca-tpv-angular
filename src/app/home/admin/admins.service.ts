import {Injectable} from '@angular/core';

import {HttpService} from '../../core/http.service';

@Injectable()
export class AdminsService {
  static END_POINT = '/admins';
  static DB = '/db';
  static STATE = '/state';

  constructor(private httpService: HttpService) {
  }


  powerOff() {
    this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.STATE).subscribe(
      () => {
      }
    );
  }

  deleteDb(): void {
    this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
      () => this.httpService.logout()
    );
  }

}
