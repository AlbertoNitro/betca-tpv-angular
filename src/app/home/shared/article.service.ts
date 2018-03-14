import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Article} from './article.model';
import {HttpService} from '../../core/http.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ArticleService {

  static END_POINT = '/articles';
  static FILTRO = '/filter';
  static INCOMPLETES = '/incompletos';
  constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
  }

  readObservable(code: String): Observable<Article> {
    return this.httpService.authToken().get(ArticleService.END_POINT + '/' + code);
  }

  readAll() {
    return this.httpService.authToken().get(ArticleService.END_POINT);
  }

  readAllIncomplete() {
    return this.httpService.authToken().get(ArticleService.END_POINT + ArticleService.INCOMPLETES);
  }

  articleGenerateObservable(article: Article): Observable<Article> {
    return this.httpService.authToken().post(ArticleService.END_POINT, article);

  }

  fastArticleGenerate(article: Article) {
    this.articleGenerateObservable(article).subscribe(
        data => {
            this.successful();
        },
        error => {
            this.unsuccessful();
        }

    );
}
readAdvancedSearch(article: Article): Observable<Article[]> {
    return this.httpService.authToken().post(ArticleService.END_POINT + ArticleService.FILTRO, article).map(
        data => {
            console.log(data);
            return data;
        }
    );
  }
private successful() {
    this.snackBar.open('Successful', '', {
        duration: 2000
    });
}

private unsuccessful() {
    this.snackBar.open('Unsuccessful', '', {
        duration: 2000
    });
}


}
