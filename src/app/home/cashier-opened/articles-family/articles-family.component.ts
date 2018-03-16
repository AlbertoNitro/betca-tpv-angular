/**
 * Created by Moons on 11/3/2018.
 */
import {Component, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {ArticleService} from '../../shared/article.service';
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
  private imagePathArticle = '../../../assets/img/articles/art-blue.jpg';
  private imagePathFamily = '../../../assets/img/articles/folder-blue.png';
  private code;
  private subscription: Subscription;
  private articleList: Article[] = [];
  private articleFamilyList: Article[] = [];


  listArt: Article[] = [
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28}

  ];

  constructor(public shoppingCartService: ShoppingCartService, public articleService: ArticleService) {

    this.subscription = this.shoppingCartService.shoppingCartObservable().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Shopping>(data);
      }
    );
  }

  ngOnInit() {
    this.getAllArticles();
    this.getAllArticleFamily();
  }

  getAllArticles() {
    this.articleList = [];
    this.articleService.readAll().subscribe(
      data => {
        console.log(data);
        this.articleList = data;
      },
    );
  }

  getAllArticleFamily() {
    this.articleFamilyList = [];
  }

  add(code: string) {
    this.code = code;
    this.shoppingCartService.add(code);
  }
}



