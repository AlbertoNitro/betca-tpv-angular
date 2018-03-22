import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProviderService } from '../providers/provider.service';
import { Provider } from '../providers/provider.model';
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
  listaProvider: Provider[];

  constructor(private articleService: ArticleService, public shoppingCartService: ShoppingCartService,
    private providerService: ProviderService) {
      this.providerService.readAll().subscribe(
        data => {
            this.listaProvider = data;
        }
    );
    this.articleForm = {
      code: '', reference: null, description: '', stock: 0,
      retailPriceMin: 0, retailPriceMax: 0, provider: ''
    };
  }
  add(code: string) {
    this.code = code;
    this.shoppingCartService.add(code);
  }
  buscar() {
    this.articleForm.description = this.articleForm.description.trim();
    if (this.articleForm.reference != null) {
      if (!this.articleForm.reference.trim()) {
        this.articleForm.reference = null;
      }
    }
    console.log(this.articleForm);
    this.articleService.readAdvancedSearch(this.articleForm).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Article>(data);
      },
    );
  }
}
