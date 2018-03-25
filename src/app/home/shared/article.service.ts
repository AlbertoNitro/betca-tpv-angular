import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Article } from './article.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ArticleService {
    static END_POINT = '/articles';

    static INCOMPLETES = '/incompletes';
    static FILTRO = '/filter';

    constructor(private httpService: HttpService) {
    }

    readObservable(code: String): Observable<Article> {
        return this.httpService.authToken().get(ArticleService.END_POINT + '/' + code);
    }

    readAll() {
        return this.httpService.authToken().get(ArticleService.END_POINT);
    }

    readAllIncompletes() {
        return this.httpService.authToken().get(ArticleService.END_POINT + ArticleService.INCOMPLETES);
    }

    create(article: Article): Observable<Article> {
        return this.httpService.authToken().successful().post(ArticleService.END_POINT, article);

    }

    update(article: Article): Observable<Article> {
        return this.httpService.authToken().successful().put(ArticleService.END_POINT + '/' + article.code, article);
    }

    readAdvancedSearch(article: Article): Observable<Article[]> {
        return this.httpService.authToken().post(ArticleService.END_POINT + ArticleService.FILTRO, article).map(
            data => {
                console.log(data);
                return data;
            }
        );
    }
}
