import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { ArticleCreationEditDialogComponent } from './article-creation-edit-dialog.component';
import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {
  static URL = 'articles';

  article: Article;
  providers: Provider[];

  title = 'Articles management';
  columns = ['code', 'description'];
  data: Article[];

  onlyIncomplete = true;

  constructor(private dialog: MatDialog, private articleService: ArticleService, private providerService: ProviderService) {
    this.resetFilter();
    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
    this.synchronize();
  }

  synchronize() {
    if (this.onlyIncomplete) {
      this.articleService.readAllIncompletes().subscribe(
        articles => this.data = articles
      );
    } else {
      this.data = null;
    }
  }

  trim(str: string) {
    if (str) {
      return str.trim();
    } else {
      return null;
    }
  }

  filter() {
    this.article.description = this.trim(this.article.description);
    this.article.reference = this.trim(this.article.reference);
    this.articleService.readAdvancedSearch(this.article).subscribe(
      data => this.data = data
    );
  }

  resetFilter() {
    this.article = { code: null, reference: null, description: null, provider: null };
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
