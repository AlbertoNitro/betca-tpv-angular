import { Component, Output, EventEmitter, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Provider } from '../../shared/provider.model';
import { Article } from '../../shared/article.model';
import { ArticleService } from '../../shared/article.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ProviderService } from '../../shared/provider.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: 'advanced-search.component.html'
})
export class AdvancedSearchComponent {

  displayedColumns = ['reference', 'description', 'provider', 'stock', 'actions'];
  dataSource: MatTableDataSource<Article>;

  article: Article;
  providers: Provider[];

  _initialProvider: string;

  @Input()
  set initialProvider(initialProvider) {
    this._initialProvider = initialProvider;
    this.reset();
  }

  @Output() add = new EventEmitter<any>();

  constructor(private articleService: ArticleService, private shoppingCartService: ShoppingCartService,
    private providerService: ProviderService) {

    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
    this.reset();
  }

  find() {
    this.article.description = this.trim(this.article.description);
    this.article.reference = this.trim(this.article.reference);
    this.articleService.readAdvancedSearch(this.article).subscribe(
      data => this.dataSource = new MatTableDataSource<Article>(data)
    );
  }

  provider(id) {
    return this.providers.find(provider => provider.id === id).company;
  }

  reset() {
    this.article = { code: null, reference: null, description: null, provider: this._initialProvider };
    this.dataSource = undefined;
  }

  trim(str: string) {
    if (str) {
      return str.trim();
    } else {
      return null;
    }
  }

  onAdd(item) {
    this.add.emit(item);
  }

}
