import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { ShoppingCartService } from './shopping-cart.service';
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

    constructor(private articleService: ArticleService, public shoppingCartService: ShoppingCartService) {
      this.articleForm = { code: null, reference: null, description: null, stock: null,
                          retailPriceMin: null , retailPriceMax: null , provider : null};
    }
    add(code: string) {
      this.code = code;
      this.shoppingCartService.add(code);
    }
    buscar() {
      console.log(this.articleForm);
      this.articleService.readAdvancedSearch(this.articleForm).subscribe(
        data => {
          this.dataSource = new MatTableDataSource<Article>(data);
        },
      );
    }
  }
