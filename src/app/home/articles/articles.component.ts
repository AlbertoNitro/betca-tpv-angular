import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { ArticleCreationEditDialogComponent } from './article-creation-edit-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent implements OnInit {
  static URL = 'articles';

  title = 'Articles management';
  columns = ['code', 'description'];
  data: Article[];

  onlyIncomplete = true;

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.synchronize();
  }

  synchronize() {
    if (this.onlyIncomplete) {
      this.articleService.readAllIncompletes().subscribe(
        data => this.data = data
      );
    } else {
      this.articleService.readAll().subscribe(
        data => this.data = data
      );
    }
  }

  create() {
    this.dialog.open(ArticleCreationEditDialogComponent).afterClosed().subscribe(
      result => this.synchronize()
    );
  }

  edit(article: Article) {
    this.articleService.readObservable(article.code).subscribe(
      data => {
        const dialogRef = this.dialog.open(ArticleCreationEditDialogComponent);
        dialogRef.componentInstance.article = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          result => this.synchronize()
        );
      }
    );
  }

}
