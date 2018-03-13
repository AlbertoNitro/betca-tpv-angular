import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Article } from '../shared/article.model';
@Component({
    selector: 'app-advanced-search',
    styleUrls: ['advanced-search.component.css'],
    templateUrl: 'advanced-search.component.html'
  })
  export class AdvancedSearchComponent {
    displayedColumns = ['id', 'reference', 'description', 'retailPrice', 'stock', 'provider', 'committed'];
    dataSource: MatTableDataSource<Article>;
    private code;
    articleForm: Article;

    constructor() {
      this.articleForm = { code: null, reference: null, description: null, retailPrice: null, stock: null };
    }

  }
