/**
 * Created by Moons on 11/3/2018.
 */
import {Component, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {ArticleService} from '../../shared/article.service';
import {ArticleFamilyService} from '../../shared/article-family.service';
import {Shopping} from '../../shared/shopping.model';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ShoppingCartService} from '../../cashier-opened/shopping-cart.service';


@Component({
  selector: 'app-articles-family',
  templateUrl: './articles-family.component.html',
  styleUrls: ['./articles-family.component.css']
})

export class ArticlesFamilyComponent implements OnInit {
  static URL = 'articlesfamily';
  dataSource: MatTableDataSource<Shopping>;
  private positionabove = 'above';
  private positionleft = 'left';
  private positioncenter = 'center';
  private imagePathArticle = '../../../assets/img/articles/art-blue.jpg';
  private imagePathFamily = '../../../assets/img/articles/folder-blue.png';
  private code;
  private subscription: Subscription;
  private actualfamily: String;
  private articleList: Article[] = [];
  private articleFamilyList: Object[] = [];


  constructor(public shoppingCartService: ShoppingCartService,
              public articleService: ArticleService,
              public articleFamilyService: ArticleFamilyService) {
    this.actualfamily = 'Inicio';
    this.subscription = this.shoppingCartService.shoppingCartObservable().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Shopping>(data);
      }
    );
  }

  ngOnInit() {

    this.getAllArticleFamily();

  }


  getAllArticleFamily() {
    this.actualfamily = 'Inicio';
    this.articleFamilyList = [];
    this.articleFamilyService.readAllTwoListArticleAndFamilys().subscribe(
      data => {
        console.log(data);
        this.articleFamilyList = data;
      },
    );
  }

  add(code: string) {
    this.code = code;
    this.shoppingCartService.add(code);
  }


  viewArticles(reference: String) {
    this.actualfamily = reference;
    this.articleFamilyList = [];
    this.articleFamilyService.readObservable(reference).subscribe(
      data => {
        console.log(data);
        this.articleFamilyList = data;
      },
    );

  }
}
