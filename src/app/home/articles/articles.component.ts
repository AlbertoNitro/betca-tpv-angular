import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { ArticleCreationEditDialogComponent } from './article-creation-edit-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {
  static URL = 'articles';

  title = 'Articles management';
  columns = ['code', 'description'];
  data: Article[];

  onlyIncomplete = true;

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
    this.synchronize();
  }

  synchronize() {
    if (this.onlyIncomplete) {
      this.articleService.readAllIncompletes().subscribe(
        articles => this.data = articles
      );
    } else {
      this.articleService.readAll().subscribe(
        articles => this.data = articles
      );
    }
  }

  create() {
    this.dialog.open(ArticleCreationEditDialogComponent).afterClosed().subscribe(
      result => this.synchronize()
    );
  }

  edit(article: Article) {
    this.articleService.readOne(article.code).subscribe(
      data => {
        this.dialog.open(ArticleCreationEditDialogComponent, {
          width: '500px',
          data: { article: data, editable: true }
        }).afterClosed().subscribe(
          result => this.synchronize()
        );
      }
    );
  }

}
