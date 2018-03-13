import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Article} from './article.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class ArticleService {

  static END_POINT = '/articles';

  constructor(private httpService: HttpService) {
  }

  readObservable(code: String): Observable<Article> {
    return this.httpService.authToken().get(ArticleService.END_POINT + '/' + code);
  }

  readAll(): Observable<Article[]> {
    return this.httpService.authToken().get(ArticleService.END_POINT);
  }

  articleGenerateObservable(article: Article): Observable<Article> {
    return this.httpService.authToken().post(ArticleService.END_POINT, article);

  }


}
