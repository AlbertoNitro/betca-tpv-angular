import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Article} from './article.model';
import {HttpService} from '../../core/http.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ArticleService {

  static END_POINT = '/articles';

  constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
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
