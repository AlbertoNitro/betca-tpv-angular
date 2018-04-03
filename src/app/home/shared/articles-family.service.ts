import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Family } from '../cashier-opened/articles-family/family.model';
import { FamilyType } from '../cashier-opened/articles-family/family-type.model';
import { ArticleService } from './article.service';

@Injectable()
export class ArticlesFamilyService {
  static END_POINT = '/articles-family';

  static LIST = '/list';

  constructor(private httpService: HttpService) {
  }

  findList(id: string): Observable<Family[]> {
    return this.httpService.authToken().get(ArticlesFamilyService.END_POINT + `/${id}` + ArticlesFamilyService.LIST);
  }

  find(id: string): Observable<Family> {
    return this.httpService.authToken().get(ArticlesFamilyService.END_POINT + `/${id}`);
  }

  findAll(): Observable<Family[]> {
    return this.httpService.authToken().get(ArticlesFamilyService.END_POINT);
  }

  create(family: Family): Observable<any> {
    return this.httpService.authToken().post(ArticlesFamilyService.END_POINT, family);
  }

  add(familyId: string, childId: string): Observable<any> {
    return this.httpService.authToken().post(ArticlesFamilyService.END_POINT + `/${familyId}` + ArticlesFamilyService.LIST, childId);
  }

  delete(familyId: string, childId: string): Observable<any> {
    return this.httpService.authToken().delete(
      ArticlesFamilyService.END_POINT + `/${familyId}` + ArticlesFamilyService.LIST + `/${childId}`);
  }

}
