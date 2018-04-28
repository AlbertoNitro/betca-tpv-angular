import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';

import {Article} from '../shared/article.model';
import {Provider} from '../shared/provider.model';
import {ArticleService} from '../shared/article.service';
import {ProviderService} from '../shared/provider.service';
import {Tag} from './tag.model';
import {TagsService} from './tags.sevice';

@Component({
  templateUrl: 'tag-creation-edit-dialog.component.html',
  styleUrls: ['articles.component.css']
})
export class TagCreationEditDialogComponent {

  edit: boolean;
  tag: Tag;
  providers: Provider[];

  displayedColumns = ['i', 'code', 'description', 'actions'];
  dataSource: MatTableDataSource<Article>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<TagCreationEditDialogComponent>,
              public dialog: MatDialog, private providerService: ProviderService, private articleService: ArticleService,
              private tagsService: TagsService) {

    this.tag = data.tag;
    this.edit = data.edit;
    this.providerService.readAll().subscribe(
      providers => this.providers = providers
    );
    if (!this.tag) {
      this.tag = {id: undefined, description: undefined, articles: []};
    }
    this.syncronize();
  }

  syncronize() {
    this.dataSource = new MatTableDataSource<Article>(this.tag.articles);
  }

  isActionCompleted() {
    return this.tag.description && this.tag.articles.length > 0;
  }

  create(): void {
    this.tagsService.create(this.tag).subscribe(
      () => this.dialogRef.close()
    );
  }

  update(): void {
    this.tagsService.update(this.tag).subscribe(
      () => this.dialogRef.close()
    );
  }

  findArticle(code: string) {
    this.articleService.readOne(code).subscribe(
      article => {
        this.tag.articles.push(article);
        this.syncronize();
      }
    );
  }

  add(article: Article) {
    this.tag.articles.push(article);
    this.syncronize();
  }

  onDelete(article: Article) {
    const index = this.tag.articles.indexOf(article);
    if (index > -1) {
      this.tag.articles.splice(index, 1);
    }
    this.syncronize();
  }

}
