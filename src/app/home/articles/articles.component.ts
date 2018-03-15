import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../shared/article.model';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { ArticleService } from '../shared/article.service';
import { ArticleCreationEditDialogComponent } from './article-creation-edit-dialog.component';

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
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private articleService: ArticleService, public dialog: MatDialog  ) {
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
    const dialogRef = this.dialog.open(ArticleCreationEditDialogComponent, {
      width: '600px',
      height: '600px'
    }
  );
  dialogRef.afterClosed().subscribe(result => {
    this.synchronize();
  });

  }

  synchronize() {
    this.articleService.readAll().subscribe(
        data => {
            this.dataSource = new MatTableDataSource<Article>(data);
            this.dataSource.sort = this.sort;
        }
    );
}

  edit(article: Article) {

  }

}
