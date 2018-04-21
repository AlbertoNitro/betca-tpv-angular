import { Component } from '@angular/core';
import { Article } from '../shared/article.model';
import { MatDialog } from '@angular/material';
import { ArticleService } from '../shared/article.service';
import { TagsService } from './tags.sevice';
import { Tag } from './tag.model';
import { TagCreationEditDialogComponent } from './tag-creation-edit-dialog.component';

@Component({
    templateUrl: 'tags.component.html'
})
export class TagsComponent {
    static URL = 'article-tags';

    columns = ['id', 'description'];
    data: Tag[];

    constructor(public dialog: MatDialog, private tagsService: TagsService) {
        this.synchronize();
    }

    synchronize() {
        this.tagsService.readAll().subscribe(
            tags => this.data = tags
        );
    }


    update(tag?: Tag, edit?: boolean) {
        if (!tag) {
            tag = { id: undefined, description: undefined, articles: new Array()};
        }
        if (!edit) {
            edit = false;
        }
        this.dialog.open(TagCreationEditDialogComponent,
            {
                width: '700px',
                data: { edit: edit, tag: tag }
            }
        ).afterClosed().subscribe(
            () => this.synchronize()
        );
    }

    edit(tag: Tag) {
        this.update(tag, true);
    }

    delete(tag: Tag) {
        this.tagsService.delete(tag).subscribe(
            () => this.synchronize()
        );
    }

    tag24(tag: Tag) {
        this.tagsService.tag24(tag);
    }


}
