import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';


@Component({
    templateUrl: 'article-quick-generate-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ArticleQuickDialogComponent {

    public code;
    public description: string;
    public retailPrice: number;

    constructor(
        public articleService: ArticleService,
        public dialogRef: MatDialogRef<ArticleQuickDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.code = data.code;
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
    sendData() {
        let article: Article = {code: this.code, reference: null, description: this.description, retailPrice: this.retailPrice, stock: null}
        this.articleService.fastArticleGenerate(article);
    }

}
