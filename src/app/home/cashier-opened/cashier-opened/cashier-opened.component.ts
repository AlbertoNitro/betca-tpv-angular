import { Component } from '@angular/core';

import { Article } from '../../shared/article.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  templateUrl: 'cashier-opened.component.html',
  styleUrls: ['cashier-opened.component.css']
})
export class CashierOpenedComponent {
  static URL = 'cashier-opened';

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  add(article: Article) {
    this.shoppingCartService.add(article.code).subscribe(
      () => { }
    );
  }

}
