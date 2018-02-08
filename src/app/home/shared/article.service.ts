import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ArticleService {
    static END_POINT = '/articles';

    constructor(private httpService: HttpService) {
    }

    readObservable(code: String): Observable<Article> {
        return this.httpService.authToken().get(ArticleService.END_POINT + '/' + code);
    }

}
