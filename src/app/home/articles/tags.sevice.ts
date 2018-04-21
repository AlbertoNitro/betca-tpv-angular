import { Injectable } from '@angular/core';
import { Tag } from './tag.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';

@Injectable()
export class TagsService {
    static END_POINT = '/tags';

    static STICKER = '/sticker';

    constructor(private httpService: HttpService) {
    }

    readAll(): Observable<Tag[]> {
        return this.httpService.authToken().get(TagsService.END_POINT);
    }

    delete(tag: Tag): Observable<any> {
        return this.httpService.authToken().successful().delete(TagsService.END_POINT + `/${tag.id}`);
    }

    readOne(tag: Tag): Observable<Tag> {
        return this.httpService.authToken().get(TagsService.END_POINT + `/${tag.id}`);
    }

    tag24(tag: Tag): void {
        this.httpService.authToken().pdf(false).get(TagsService.END_POINT + `/${tag.id}` + TagsService.STICKER).subscribe(
            () => { }
        );
    }

    update(tag: Tag): Observable<any> {
        return this.httpService.authToken().successful().put(TagsService.END_POINT + `/${tag.id}`, tag);
    }

    create(tag: Tag): Observable<any> {
        return this.httpService.authToken().successful().post(TagsService.END_POINT, tag);
    }

}
