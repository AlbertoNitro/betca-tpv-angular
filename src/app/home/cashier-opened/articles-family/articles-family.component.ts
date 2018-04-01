import { Component, OnInit } from '@angular/core';
import { Article } from '../../shared/article.model';
import { ArticleService } from '../../shared/article.service';
import { ArticlesFamilyService } from '../../shared/articles-family.service';
import { Shopping } from '../../shared/shopping.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../cashier-opened/shopping-cart/shopping-cart.service';
import { ArticlesFamilySizesDialogComponent } from './articles-family-sizes-dialog.component';
import { Family } from './family.model';
import { FamilyType } from './family-type.model';


@Component({
  selector: 'app-articles-family',
  templateUrl: './articles-family.component.html',
  styleUrls: ['./articles-family.component.css']
})

export class ArticlesFamilyComponent {
  static URL = 'articlesfamily';

  families: Family[];


  constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
    private articlesFamilyService: ArticlesFamilyService) {

    this.families = this.articlesFamilyService.findRoot();
  }

  color(family: Family) {
    if (family.composite === FamilyType.ARTICLES) {
      return 'primary';
    } else {
      return 'accent';
    }
  }

  find(family: Family) {
    if (family.composite === FamilyType.ARTICLE) {
      this.shoppingCartService.add(family.id).subscribe(
        () => true
      );
    } else {
      this.articlesFamilyService.find(family.id).subscribe(
        families => this.families = families
      );
    }
  }

  tallas() {
    this.dialog.open(ArticlesFamilySizesDialogComponent, { width: '500px' });
  }

}
