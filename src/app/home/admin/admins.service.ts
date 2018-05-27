import {Injectable} from '@angular/core';

import {HttpService} from '../../core/http.service';

@Injectable()
export class AdminsService {
  static END_POINT = '/admins';
  static DB = '/db';
  static ARTICLES_WITHOUT_CODE = '/articles-without-code';
  static STATE = '/state';

  constructor(private httpService: HttpService) {
  }


  powerOff() {
    this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.STATE).subscribe(
      () => {
      }
    );
  }

  seedDb(ymlFileName: string): void {
    this.httpService.authToken().successful().post(AdminsService.END_POINT + AdminsService.DB, ymlFileName).subscribe(
      () => {
      }
    );
  }

  deleteDb(): void {
    this.httpService.authToken().successful().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
      () => this.httpService.logout()
    );
  }

  resetDb(): void {
    this.httpService.authToken().successful().delete(
      AdminsService.END_POINT + AdminsService.DB + AdminsService.ARTICLES_WITHOUT_CODE).subscribe(
      () => {
      }
    );
  }

}
