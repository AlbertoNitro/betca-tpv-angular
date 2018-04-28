import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TagsService} from './tags.sevice';
import {Tag} from './tag.model';
import {TagCreationEditDialogComponent} from './tag-creation-edit-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

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
      tag = {id: undefined, description: undefined, articles: []};
    }
    if (!edit) {
      edit = false;
    }
    this.dialog.open(TagCreationEditDialogComponent,
      {
        width: '700px',
        data: {edit: edit, tag: tag}
      }
    ).afterClosed().subscribe(
      () => this.synchronize()
    );
  }

  edit(tag: Tag) {
    this.update(tag, true);
  }

  delete(tag: Tag) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.tagsService.delete(tag).subscribe(
            () => this.synchronize()
          );
        }
      }
    );
  }

  tag24(tag: Tag) {
    this.tagsService.tag24(tag);
  }

}
