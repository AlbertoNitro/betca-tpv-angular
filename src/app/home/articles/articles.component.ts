import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/article.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})



export class ArticlesComponent implements OnInit {
  static URL = 'articles';
  private articleList: Article[] = [];
  dataSource: MatTableDataSource<Article>;
  displayedColumns = ['code', 'description', 'reference', 'retailprice', 'stock'];
  constructor() {
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.dataSource = new MatTableDataSource<Article>(this.articleList);
  }

  ngOnInit() {
  }

}
