import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/article.model';
import { MatTableDataSource } from '@angular/material';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})



export class ArticlesComponent implements OnInit {
  static URL = 'articles';
  private articleList: Article[] = [];
  dataSource: MatTableDataSource<Article>;
  displayedColumns = ['code', 'description', 'reference', 'retailprice', 'stock', 'actions'];

  constructor(  private articleService: ArticleService  ) {
    this.dataSource = new MatTableDataSource<Article>(this.articleList);
  }

  ngOnInit() {
  }

  mostrarArticulos() {
    this.articleList = [];
    this.articleService.readAll().subscribe(
        data => {
          console.log(data);
          this.articleList = data;
          this.dataSource = new MatTableDataSource<Article>(this.articleList);

        },
    );
  }

  mostrarArticulosIncompletos() {
    this.articleList = [];
    this.articleService.readAllIncomplete().subscribe(
        data => {
          console.log(data);
          this.articleList = data;
          this.dataSource = new MatTableDataSource<Article>(this.articleList);

        },
    );

  }

  filtroAvanzado() {
    // TODO Cargar vista filtro avanzado
  }

  create() {

  }

  edit(article: Article) {

  }

}
