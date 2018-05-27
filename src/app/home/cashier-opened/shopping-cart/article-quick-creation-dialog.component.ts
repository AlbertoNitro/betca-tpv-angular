import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Article} from '../../shared/article.model';
import {ArticleService} from '../../shared/article.service';


@Component({
  templateUrl: 'article-quick-creation-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class ArticleQuickCreationDialogComponent {

  article: Article;

  constructor(public articleService: ArticleService, private dialogRef: MatDialogRef<ArticleQuickCreationDialogComponent>) {
  }

  create() {
    this.articleService.create(this.article).subscribe(
      data => this.dialogRef.close(true)
    );
  }
}
