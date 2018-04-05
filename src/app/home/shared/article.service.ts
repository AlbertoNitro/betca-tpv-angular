import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Article } from './article.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ArticleService {
    static END_POINT = '/articles';

    static INCOMPLETES = '/incompletes';
    static SEARCH = '/search';

    constructor(private httpService: HttpService) {
    }

    readOne(code: String): Observable<Article> {
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
        let httpservice = this.httpService.authToken();
        if (article.description) {
            httpservice = httpservice.param('description', article.description);
        }
        if (article.reference) {
            httpservice = httpservice.param('reference', article.reference);
        }
        if (article.provider) {
            httpservice = httpservice.param('provider', article.provider);
        }
        return httpservice.get(ArticleService.END_POINT + ArticleService.SEARCH);
    }
}
