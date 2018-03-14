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
  displayedColumns = ['code', 'description', 'reference', 'retailprice', 'stock'];

  constructor(  private articleService: ArticleService  ) {
    this.dataSource = new MatTableDataSource<Article>(this.articleList);
  }

  ngOnInit() {
  }

  mostrarArticulos() {
    // TODO Consulta a base de dato sacando todos los articulos
    this.articleList = [];
    /*this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '288', retailPrice: 200, stock: 2 });*/
    this.articleService.readAll();
    this.articleService.readAll().subscribe(
        data => {
          console.log(data);
          this.articleList = data;
          this.dataSource = new MatTableDataSource<Article>(this.articleList);

        },
    );
  }

  mostrarArticulosIncompletos() {
    // TODO consulta a elementos que le falte algún campo
    this.articleList = [];
    this.articleList.push({ code: '12345', description: 'holaholahola', reference: '', retailPrice: 200, stock: 2 });
    this.articleList.push({ code: '12345', description: '', reference: '288', retailPrice: 200, stock: 2 });
    this.dataSource = new MatTableDataSource<Article>(this.articleList);

  }

  filtroAvanzado() {
    // TODO Cargar vista filtro avanzado
  }

}
