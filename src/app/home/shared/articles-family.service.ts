import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Family } from '../cashier-opened/articles-family/family.model';
import { FamilyType } from '../cashier-opened/articles-family/family-type.model';
import { ArticleService } from './article.service';

@Injectable()
export class ArticlesFamilyService {

  static END_POINT = '/articles-family';
  static FAMILY = '/family';
  static REFERENCE = '/reference';

  static ROOT: Family[] = [
    { id: '1', reference: 'SJB', description: 'San Juan Bosco', composite: FamilyType.ARTICLES },
    { id: '2', reference: 'Media TU', description: 'YM. Media elastica talla única', composite: FamilyType.ARTICLE },
    { id: '3', reference: 'SJB', description: 'San Juan Bosco', composite: FamilyType.ARTICLES },
    { id: '4', reference: 'SJB', description: 'San Juan Bosco', composite: FamilyType.ARTICLES },
    { id: '5', reference: 'SJB', description: 'San Juan Bosco', composite: FamilyType.ARTICLES },
    { id: '6', reference: 'SJB', description: 'San Juan Bosco', composite: FamilyType.ARTICLES },
  ];

  constructor(private httpService: HttpService) {
  }

  findRoot(): Family[] {
    return ArticlesFamilyService.ROOT;
  }

  find(id: string): Observable<Family[]> {
    return this.httpService.authToken().get(ArticleService.END_POINT + '/' + id).map(
      families => {
        return ArticlesFamilyService.ROOT;
      }
    );
  }


}
