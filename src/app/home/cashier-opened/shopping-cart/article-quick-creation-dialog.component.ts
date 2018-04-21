import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { Article } from '../../shared/article.model';
import { ArticleService } from '../../shared/article.service';
import { MatSnackBar } from '@angular/material';



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
