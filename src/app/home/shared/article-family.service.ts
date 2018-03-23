/**
 * Created by Moons on 16/3/2018.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HttpService} from '../../core/http.service';

@Injectable()
export class ArticleFamilyService {

  static END_POINT = '/articlesfamily';
  static FAMILY = '/family';


  constructor(private httpService: HttpService) {
  }

  readAllTwoListArticleAndFamilys() {
    return this.httpService.authToken().get(ArticleFamilyService.END_POINT);
  }

  readAllComonentOneListObjetc() {
    return this.httpService.authToken().get(ArticleFamilyService.END_POINT + ArticleFamilyService.FAMILY);
  }
}
