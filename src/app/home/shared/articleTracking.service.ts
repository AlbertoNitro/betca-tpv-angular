import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ticket } from './ticket.model';
import { TicketUpdation } from './ticket-updation.model';
import { Shopping } from './shopping.model';
import { NumProductSold } from './numProductSold.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ArticleTrackingService {
  static END_POINT = '/tickets';

  static SEARCH_BY_ID_COMMIT = '/searchByIdAndCommit';

  constructor(private httpService: HttpService) {
  }

  readOne(id: string): Observable<Ticket> {
    return this.httpService.authToken().get(ArticleTrackingService.END_POINT + '/' + id);
  }

  findIdArticleNotCommited(id: string, committed: string): Observable<Ticket> {
    return this.httpService.authToken()
    .param('id', id)
    .param('committed', committed)
    .get(ArticleTrackingService.END_POINT + ArticleTrackingService.SEARCH_BY_ID_COMMIT);
  }

}
